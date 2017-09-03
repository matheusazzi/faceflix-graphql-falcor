const DB = require('./../config/db')

const Title = require('./title')
const User = require('./user')

const Recommendation = DB.Model.extend({
  tableName: 'recommendations',

  hasTimestamps: true,

  title: function() {
    return this.belongsTo(Title)
  },

  user: function() {
    return this.belongsTo(User)
  }

})

module.exports = Recommendation
