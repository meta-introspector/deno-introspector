lint:
	deno lint
test:
	deno run --allow-env --allow-read main_test1.ts 

test3:
	deno test --allow-read --trace-leaks
filter:
	npx ts-node ./filter.ts

test2:
	npx ts-node ./process.ts
process_files:
	npx ts-node ./process_files.ts
