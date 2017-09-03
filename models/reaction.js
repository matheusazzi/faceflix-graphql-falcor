const DB = require('./../config/db')

const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')

const Reaction = DB.Model.extend({
  tableName: 'reactions',

  hasTimestamps: true,

  user: function() {
    return this.belongsTo(User)
  },

  reactionable: function() {
    return this.morphTo('reactionable', Post, Comment)
  }

})

module.exports = Reaction
