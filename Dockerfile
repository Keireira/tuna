# Stage 1: Install the package-manager version pinned in package.json.
FROM node:24-alpine AS deps

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN node -e "if (!require('./package.json').packageManager?.startsWith('pnpm@')) throw new Error('Pin pnpm in package.json packageManager')" \
    && corepack install \
    && pnpm install --frozen-lockfile

# Stage 2: Reuse the dependencies and Corepack cache from the first stage.
FROM deps AS build

COPY . .
RUN pnpm build

# Stage 3: Run only the standalone Next.js server as the unprivileged node user.
FROM node:24-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
