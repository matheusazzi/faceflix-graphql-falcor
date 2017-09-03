const DB = require('./../db')

const Title = require('./title')

const Genre = DB.Model.extend({
  tableName: 'genres',

  hasTimestamps: true,

  titles: function() {
    return this.hasMany(Title)
  }

})

module.exports = Genre
