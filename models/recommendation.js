const DB = require('./../config/db')

const Movie = require('./movie')
const User = require('./user')

const Recommendation = DB.Model.extend({
  tableName: 'recommendations',

  hasTimestamps: true,

  movie: function() {
    return this.belongsTo(Movie)
  },

  user: function() {
    return this.belongsTo(User)
  }

})

module.exports = Recommendation
