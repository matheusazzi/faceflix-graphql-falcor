const DB = require('./../config/db')

const User = require('./user')
const Celebrity = require('./celebrity')
const Title = require('./title')

const Media = DB.Model.extend({
  tableName: 'medias',

  hasTimestamps: true,

  attachable: function() {
    return this.morphTo('attachable', User, Celebrity, Title)
  }

})

module.exports = Media
