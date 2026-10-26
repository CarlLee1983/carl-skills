import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { summarizeImageResult } from './tool-results.mjs';

test('summarizes an image without exposing payloads or free-form metadata', () => {
  const payload = 'data:image/png;base64,' + 'A'.repeat(3000000);
  const result = {
    image_url: payload,
    output_hint: payload,
    errorMessage: payload,
    width: 1024,
    height: 1536,
    arbitrary: { payload },
  };
  const summary = summarizeImageResult(result);
  assert.deepEqual(summary, {
    isError: false, hasImage: true, imageCount: 1,
    imageChars: payload.length, contentTruncated: false, width: 1024, height: 1536,
  });
  assert.ok(JSON.stringify(summary).length < 200);
  assert.equal(result.image_url, payload);
});

test('handles errors, absent results and unexpected metadata with a fixed whitelist', () => {
  for (const result of [null, undefined, 'data:image/png;base64,SECRET', [], 42]) {
    assert.deepEqual(summarizeImageResult(result), {
      isError: false, hasImage: false, imageCount: 0, imageChars: 0, contentTruncated: false,
    });
  }
  for (const result of [new Error('SECRET'), { error: 'SECRET' }, { isError: true }]) {
    assert.equal(summarizeImageResult(result).isError, true);
    assert.ok(!JSON.stringify(summarizeImageResult(result)).includes('SECRET'));
  }
  assert.deepEqual(summarizeImageResult({
    width: 'data:image/png;base64,SECRET', height: Infinity,
    image_url: { secret: 'SECRET' }, status: 'SECRET', output_hint: 'SECRET',
  }), summarizeImageResult(null));
  for (const width of [-1, 0, 1.2, 100001, Number.MAX_SAFE_INTEGER]) {
    assert.equal('width' in summarizeImageResult({ width }), false);
  }
});

test('bounds content inspection and ignores text, hints and unsupported fields', () => {
  const content = Array.from({ length: 10000 }, () => ({ type: 'image', data: 'SECRET' }));
  assert.deepEqual(summarizeImageResult({ content }), {
    isError: false, hasImage: true, imageCount: 16, imageChars: 96, contentTruncated: true,
  });
  assert.equal(summarizeImageResult({ content: [
    { type: 'text', text: 'data:image/png;base64,SECRET' }, null,
    { type: 'image', data: 42 }, { type: 'image', data: '' },
  ] }).hasImage, false);
});

test('CLI emits a self-contained declaration usable in a fresh isolate', () => {
  const source = execFileSync(process.execPath, [
    new URL('./tool-results.mjs', import.meta.url).pathname, '--function',
  ], { encoding: 'utf8' });
  const summary = vm.runInNewContext(`${source}\nsummarizeImageResult({image_url: 'SECRET'});`);
  assert.deepEqual(JSON.parse(JSON.stringify(summary)), summarizeImageResult({ image_url: 'SECRET' }));
  assert.ok(source.startsWith('function summarizeImageResult('));
});
