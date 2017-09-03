const DB = require('./../db')

const Media = require('./media')
const Credit = require('./credit')

const Celebrity = DB.Model.extend({
  tableName: 'celebrities',

  defaults: {
  },

  hasTimestamps: true,

  avatar: function() {
    return this.morphOne(Media, 'attachable')
  },

  works: function() {
    return this.hasMany(Credit)
  }

})

module.exports = Celebrity
