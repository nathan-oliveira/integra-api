# Estágio de construção
FROM node:20.11.0 as build

WORKDIR /usr/src/app

COPY .docker ./
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install -g @nestjs/cli
RUN npm install --production
RUN npm run build

COPY ./dist ./dist

# Estágio de produção
FROM node:20.11.0

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 80

ENV NODE_ENV=production

ENTRYPOINT ["/usr/src/app/wait-for-db.sh"]

CMD ["node", "dist/src/main.js"]
