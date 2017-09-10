const DB = require('./../config/db')

const Movie = require('./movie')
const Celebrity = require('./celebrity')

const Favorite = DB.Model.extend({
  tableName: 'favorites',

  hasTimestamps: true,

  movie: function() {
    return this.belongsTo(Movie)
  },

  celebrity: function() {
    return this.belongsTo(Celebrity)
  }

})

module.exports = Favorite
