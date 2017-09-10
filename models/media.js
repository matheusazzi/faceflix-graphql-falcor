const DB = require('./../config/db')

const User = require('./user')
const Celebrity = require('./celebrity')
const Movie = require('./movie')

const Media = DB.Model.extend({
  tableName: 'medias',

  hasTimestamps: true,

  owner: function() {
    return this.morphTo('attachable', User, Celebrity, Movie)
  }

})

module.exports = Media
