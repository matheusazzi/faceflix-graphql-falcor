module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'base_tcc_development'
    },
    pool: {
      min: 2,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './../migrations'
    },
    seeds: {
      directory: './../seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
