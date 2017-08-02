const dbconfig = require('./knexfile')
const knex = require('knex')(dbconfig[process.env.NODE_ENV || 'development'])

module.exports = require('bookshelf')(knex)
