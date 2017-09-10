const DB = require('./../config/db')

const User = require('./user')

const Friendship = DB.Model.extend({
  tableName: 'friendships',

  hasTimestamps: true,

  users: function() {
    return this.belongsToMany(User)
  }

})

module.exports = Friendship
