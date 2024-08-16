FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
