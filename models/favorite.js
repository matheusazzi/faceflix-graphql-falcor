const DB = require('./../db')

const Title = require('./title')
const Celebrity = require('./celebrity')

const Favorite = DB.Model.extend({
  tableName: 'favorites',

  hasTimestamps: true,

  title: function() {
    return this.belongsTo(Title)
  },

  celebrity: function() {
    return this.belongsTo(Celebrity)
  }

})

module.exports = Favorite
