module.exports = {
  test: {
    client: 'pg',
    version: "10.4",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "EE",
      database: "barriga"
    },
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  prod: {
    client: 'pg',
    version: "10.4",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "EE",
      database: "seubarriga"
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};

