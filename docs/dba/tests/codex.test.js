import { test, expect } from 'bun:test';
import { finalResponse } from '../eval/codex.js';

test('commentary remains auditable without being concatenated into the structured final answer', () => {
  const event = (phase, text) => ({ method: 'item/completed', params: { item: { type: 'agentMessage', phase, text } } });
  const response = finalResponse([event('commentary', 'Checking evidence.'), event('final_answer', '{"status":"blocked"}')]);
  expect(JSON.parse(response.text)).toEqual({ status: 'blocked' });
  expect(response.messages).toHaveLength(2);
  expect(finalResponse([event('commentary', '{"status":"met"}')]).text).toBe('');
});
