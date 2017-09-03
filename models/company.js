const DB = require('./../config/db')

const Title = require('./title')

const Company = DB.Model.extend({
  tableName: 'companies',

  hasTimestamps: true,

  titles: function() {
    return this.hasMany(Title)
  }

})

module.exports = Company
