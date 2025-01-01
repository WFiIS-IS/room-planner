FROM node:23-alpine AS node

# region: build
FROM node AS build
WORKDIR /builder
COPY . .
RUN corepack enable
RUN corepack install
RUN yarn install
RUN yarn build
RUN cp -fr node_modules/@libsql .next/standalone/node_modules
# endregion: build

# region: production
FROM node AS production
COPY --from=build /builder/.next/standalone /app
COPY --from=build /builder/drizzle /app/drizzle
WORKDIR /app
COPY --from=build /builder/.next/static /app/.next/static
VOLUME /var/lib/room-planner/data
ENV DATA_DIR=/var/lib/room-planner/data
ENV NODE_ENV=production
ENTRYPOINT ["node", "server.js"]
# endregion: production
