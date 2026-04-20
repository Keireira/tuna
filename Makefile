.PHONY: rm dev build lint fix

rm:
	rm -rf ./.next
	rm ./pnpm-lock.yaml
	rm -rf ./node_modules

dev:
	pnpm run dev

build:
	pnpm run build

lint:
	pnpm run lint
	pnpm run fmt:check

fix:
	pnpm run lint:fix
	pnpm run fmt
