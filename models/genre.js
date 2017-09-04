const DB = require('./../config/db')

const Title = require('./title')

const Genre = DB.Model.extend({
  tableName: 'genres',

  hasTimestamps: true,

  titles: function() {
    return this.belongsToMany(Title)
  }

})

module.exports = Genre
