module.exports = {
  test: {
    client: 'pg',
    version: "10.4",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "asd",
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
      password: "asd",
      database: "seubarriga"
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};

