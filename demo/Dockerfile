# BASE
FROM node:18-alpine as base

ARG NPM_ACCESS_TOKEN="${NPM_ACCESS_TOKEN}"
ENV NPM_ACCESS_TOKEN $NPM_ACCESS_TOKEN


# INSTALLER
FROM base as installer

WORKDIR /app

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

# 1. install server deps
RUN yarn install --ignore-scripts --frozen-lockfile

# XXX:NOTE: There are no npm build for the FE app
# 2. install separately only web-sdk in "static" as static module
RUN npm config set '//registry.npmjs.org/:_authToken' "${NPM_ACCESS_TOKEN}"
RUN cd src/static && yarn install --ignore-scripts --frozen-lockfile


# BUILDER
FROM base as builder

WORKDIR /app

# There are no build for the server - just copy what is required
COPY --from=installer /app .


# RUNNER
FROM base as runner

WORKDIR /app

COPY --from=builder /app .

CMD yarn start