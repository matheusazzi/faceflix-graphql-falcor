const DB = require('./../config/db')

const Movie = require('./movie')

const Genre = DB.Model.extend({
  tableName: 'genres',

  hasTimestamps: true,

  movies: function() {
    return this.belongsToMany(Movie)
  }

})

module.exports = Genre
