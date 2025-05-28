FROM node:latest

WORKDIR /app

# Install and upgrade yarn
RUN npm install -g yarn && yarn set version stable

COPY package.json yarn.lock* ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
