.PHONY: check evaluate verify

check:
	bun test
	bun scripts/check.js

evaluate:
	bun eval/run.js

verify: check
	bun scripts/verify-evidence.js
