# Image result metadata

Image results can contain megabytes of base64. Keep the full result in `store` and render it with `generatedImage(result)`. For progress text, pass only the fixed numeric/boolean whitelist from `summarizeImageResult`; arbitrary hints, errors and output fields are excluded.

`functions.exec` starts a fresh JavaScript isolate per call: it cannot import this local file or intercept all tool responses. Before a call that needs metadata, run from this skill's directory:

```sh
node scripts/tool-results.mjs --function
```

Read its output and copy that exact function declaration into the `functions.exec` source before the tool call, followed by the call-site pattern below (use the image tool's actual arguments):

```js
const result = await tools.image_gen__imagegen({ prompt: '...' });
store('concept-image', result);
notify(summarizeImageResult(result));
generatedImage(result);
```

The helper counts root `image_url` and the image blocks among the first 16 MCP content entries, reports inspected payload character counts, and accepts only positive integer width/height up to 100000. `contentTruncated` marks limited inspection; `hasImage: false` does not establish tool failure or absence of other image formats. The helper is an opted-in summary for ordinary tool result objects, not a global interceptor or security guard. Keep raw results out of `text` and `notify`, including wrappers such as `{ key, result }`; other call sites remain the caller's responsibility.

Verify offline with fake results; no image generation is needed:

```sh
node --test scripts/tool-results.test.mjs
```
