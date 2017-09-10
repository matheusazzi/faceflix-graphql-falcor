const DB = require('./../config/db')

const User = require('./user')
const Title = require('./title')
const Post = require('./post')
const Reaction = require('./reaction')

const Comment = DB.Model.extend({
  tableName: 'comments',

  hasTimestamps: true,

  author: function() {
    return this.bolongsTo(User)
  },

  title: function() {
    return this.belongsTo(Title)
  },

  post: function() {
    return this.belongsTo(Post)
  },

  reactions: function() {
    return this.morphMany(Reaction, 'reactionable')
  }

})

module.exports = Comment
