const dbconfig = require('./knexfile')
const knex = require('knex')(dbconfig.development)

module.exports = require('bookshelf')(knex)
