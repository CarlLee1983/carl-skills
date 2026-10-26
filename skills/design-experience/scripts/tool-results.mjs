import { pathToFileURL } from 'node:url';

// Self-contained so --function can supply a declaration for functions.exec.
export function summarizeImageResult(result) {
  const value = result && typeof result === 'object' ? result : {};
  const summary = {
    isError: result instanceof Error || value.isError === true || value.error != null,
    hasImage: false,
    imageCount: 0,
    imageChars: 0,
    contentTruncated: false,
  };
  const countImage = (payload) => {
    if (typeof payload !== 'string' || payload.length === 0) return;
    summary.hasImage = true;
    summary.imageCount += 1;
    summary.imageChars += payload.length;
  };
  countImage(value.image_url);
  if (Array.isArray(value.content)) {
    summary.contentTruncated = value.content.length > 16;
    for (const item of value.content.slice(0, 16)) {
      if (item && item.type === 'image') countImage(item.data);
    }
  }
  for (const field of ['width', 'height']) {
    if (Number.isSafeInteger(value[field]) && value[field] > 0 && value[field] <= 100000) {
      summary[field] = value[field];
    }
  }
  return summary;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length === 3 && process.argv[2] === '--function') {
    process.stdout.write(`${summarizeImageResult.toString()}\n`);
  } else {
    process.stderr.write('Usage: node scripts/tool-results.mjs --function\n');
    process.exitCode = 1;
  }
}
