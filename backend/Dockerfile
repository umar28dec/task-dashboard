FROM node:latest

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install

COPY src ./src

EXPOSE 4000

CMD ["node", "src/index.js"]
