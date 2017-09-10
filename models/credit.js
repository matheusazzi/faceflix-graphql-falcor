const DB = require('./../config/db')

const Movie = require('./movie')
const Celebrity = require('./celebrity')

const Credit = DB.Model.extend({
  tableName: 'credits',

  hasTimestamps: true,

  movie: function() {
    return this.belongsTo(Movie)
  },

  celebrity: function() {
    return this.belongsTo(Celebrity)
  }

})

module.exports = Credit
