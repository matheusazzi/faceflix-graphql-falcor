const DB = require('./../config/db')

const User = require('./user')
const Celebrity = require('./celebrity')
const Title = require('./title')

const Media = DB.Model.extend({
  tableName: 'medias',

  hasTimestamps: true,

  owner: function() {
    return this.morphTo('attachable', User, Celebrity, Title)
  }

})

module.exports = Media
