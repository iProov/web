FROM node:lts-alpine

WORKDIR /app
ADD src/yarn.lock .
ADD src/package.json .
RUN yarn
ADD src/ .

EXPOSE 80

ENTRYPOINT ["node", "server.js"]
