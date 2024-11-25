FROM oven/bun:1.1.36-alpine

WORKDIR /app

COPY ../../package.json ../../bun.lockb /app
COPY ../../packages/shared /app/packages/shared
COPY ../../apps/server /app/apps/server
COPY ../../apps/client /app/apps/client

RUN bun i

CMD bun run --filter "@sechat/server" start
