const DB = require('./../db')

const User = DB.Model.extend({
  tableName: 'users'
})

module.exports = User
