.PHONY: rm dev lint fix

rm:
	rm -rf ./.next
	rm ./pnpm-lock.yaml
	rm -rf ./node_modules

dev:
	pnpm run dev

lint:
	pnpm run lint
	pnpm run fmt:check

fix:
	pnpm run lint:fix
	pnpm run fmt
