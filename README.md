## Framework

[Nest](https://nestjs.com) framework TypeScript repositório inicial em Node.js

## Installation

```bash
yarn install
```

## Docker (PostgreSQL & PgAdmin)

### Requirements

* nodejs >= 20.11.0
* docker >= 27.1.1
* docker-compose

# To upload the application to docker, run the commands below

```bash
chmod +x .docker/entrypoint.sh
chmod +x .docker/wait-for-db.sh
chmod +x .docker/postgres/create-schema.sh
dos2unix .docker/postgres/create-schema.sh
yarn install
yarn build
docker-compose up -d
```

# To upload the local application

* The environment variable "DATABASE_HOST" must be "localhost"

## Environment Gemini API

* GEMINI_API_KEY - [generate key](https://ai.google.dev/gemini-api/docs/api-key?hl=pt-br)

## TypeORM 3 Commands

```bash
## create migration
$ MIGRATION_NAME=measures npm run migration:create

## run migration
$ npm run migration:run

## revert migration
$ npm run migration:revert
$ npm run typeorm -- migration:show
$ npm run typeorm -- migration:revert --version=migrationName
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).