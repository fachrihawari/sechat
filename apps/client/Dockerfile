# build stage
FROM oven/bun:1.1.36-alpine AS builder
WORKDIR /app

COPY ../../package.json ../../bun.lockb /app
COPY ../../packages/shared /app/packages/shared
COPY ../../apps/server /app/apps/server
COPY ../../apps/client /app/apps/client

RUN bun i
RUN bun run --filter "@sechat/client" build

# runner stage
FROM nginx:alpine
WORKDIR /app

# Remove the default nginx.conf to add our own
RUN rm /etc/nginx/conf.d/default.conf

# Copy build & nginx conf
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html 
COPY --from=builder /app/apps/client/nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
