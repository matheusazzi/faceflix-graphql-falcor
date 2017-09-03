const DB = require('./../config/db')

const Title = require('./title')
const Celebrity = require('./celebrity')

const Credit = DB.Model.extend({
  tableName: 'credits',

  hasTimestamps: true,

  title: function() {
    return this.belongsTo(Title)
  },

  celebrity: function() {
    return this.belongsTo(Celebrity)
  }

})

module.exports = Credit
