FROM node:lts-alpine
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app

COPY . .
RUN yarn

CMD ["node", "index.js"]
