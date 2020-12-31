FROM node:lts-alpine

WORKDIR /app
ADD src/yarn.lock .
ADD src/package.json .
RUN yarn
ADD src/static/yarn.lock ./static/
ADD src/static/package.json ./static/
RUN cd /app/static && yarn && cd /app
ADD src/ .

EXPOSE 80

ENTRYPOINT ["node", "server.js"]
