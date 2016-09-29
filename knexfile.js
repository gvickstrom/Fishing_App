const databaseName = 'fishing';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
production: {
  client: 'postgresql',
  connection: process.env.postgresql-triangular-96974,
  migrations: {
    directory: __dirname + '/src/server/db/migrations'
  },
  seeds: {
    directory: __dirname + '/src/server/db/seeds'
  }
}
};
