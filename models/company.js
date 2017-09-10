const DB = require('./../config/db')

const Movie = require('./movie')

const Company = DB.Model.extend({
  tableName: 'companies',

  hasTimestamps: true,

  movies: function() {
    return this.belongsToMany(Movie)
  }

})

module.exports = Company
