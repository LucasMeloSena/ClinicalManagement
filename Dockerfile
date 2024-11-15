FROM node:20.17 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

COPY .env /app/.env
COPY entrypoint.sh .
COPY start.sh .

RUN chmod +x entrypoint.sh
RUN chmod +x ./start.sh

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3001
CMD ["./start.sh"]