.PHONY: clean rm dev build lint typecheck test check fix

# Remove generated output; preserve the lockfile and installed dependencies.
clean:
	rm -rf ./.next ./out ./dist ./tsconfig.tsbuildinfo

# Backward-compatible name for the old cleanup command.
rm: clean

dev:
	pnpm run dev

build:
	pnpm run build

lint:
	pnpm run lint
	pnpm run fmt:check

typecheck:
	pnpm run typecheck

test:
	pnpm run test

check:
	pnpm run check

fix:
	pnpm run lint:fix
	pnpm run fmt
