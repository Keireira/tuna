# Tuna

[![GitHub License](https://img.shields.io/github/license/Keireira/tuna?&style=flat-square)](https://github.com/Keireira/tuna/blob/master/LICENSE)
[![Registry](https://img.shields.io/github/deployments/Keireira/tuna/registry?label=registry&style=flat-square)](https://github.com/Keireira/tuna/deployments/registry)
[![Production](https://img.shields.io/github/deployments/Keireira/tuna/production?label=production&style=flat-square)](https://github.com/Keireira/tuna/deployments/production)
![GitHub repo size](https://img.shields.io/github/repo-size/Keireira/tuna)
![GitHub last commit](https://img.shields.io/github/last-commit/Keireira/tuna)

Website and public product-information MCP server for [Uha](https://github.com/Keireira/uha).

[Website](https://uha.app/en) | [Terms](https://uha.app/en/terms) | [Privacy](https://uha.app/en/privacy) | [MCP guide](https://uha.app/en/mcp)

## Requirements and installation

Use Node.js 24 and the exact pnpm version declared in `package.json` under `packageManager`. Corepack selects that version automatically.

```sh
corepack enable pnpm
pnpm install --frozen-lockfile
```

Keep `pnpm-lock.yaml` committed. Update dependencies and the lockfile deliberately; cleanup does not remove them.

## Development

```sh
pnpm dev
```

The site runs at `http://localhost:3000`; localized routes include `/en`, `/ru`, `/ja`, `/es`, and `/kk`.

## Checks

```sh
pnpm check
```

This runs lint, TypeScript checking, and the regression tests. It does not create a production build. Run `pnpm fmt:check` separately for formatting, or `make fix` for automatic lint and formatting fixes.

See [release preparation notes](docs/release-readiness.md) for dependency migration details, verification, and remaining release checks.

## Cleanup

```sh
make clean
```

This removes generated build output and TypeScript cache files. It preserves installed dependencies and the lockfile. `make rm` remains an alias for compatibility.

## Production

The Dockerfile builds Next.js standalone output and runs `server.js` as the unprivileged `node` user. `docker-compose.yml` exposes the service on loopback port 7777 and defines its healthcheck. Production requires Docker Compose with `up --wait` support.

The GitHub Actions workflow runs `pnpm check` before building and publishing the image, then waits for the deployed service to become healthy. It runs on pushes to `master` and manual workflow dispatches. Releases are serialized because the deployment consumes the `latest` tag.

## Public MCP endpoint

Connect a compatible Streamable HTTP MCP client to `https://uha.app/api/mcp`. The endpoint is a protocol endpoint, not a documentation page. The [MCP guide](https://uha.app/en/mcp) describes the four public read-only tools. They cannot access a personal subscription library or control the app.

## License

[AGPL-3.0](LICENSE)
