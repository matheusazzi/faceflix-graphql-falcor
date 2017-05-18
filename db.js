const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: 'test_knex_dev',
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 5
  },
  migrations: {
    tableName: 'knex_migrations'
  }
})

module.exports = require('bookshelf')(knex)
