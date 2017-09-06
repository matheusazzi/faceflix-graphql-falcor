const DB = require('./../config/db')

const User = require('./user')
const Title = require('./title')
const Comment = require('./comment')
const Reaction = require('./reaction')

const Post = DB.Model.extend({
  tableName: 'posts',

  defaults: {
  },

  hasTimestamps: true,

  author: function() {
    return this.bolongsTo(User)
  },

  title: function() {
    return this.belongsTo(Title)
  },

  comments: function() {
    return this.hasMany(Comment)
  },

  reactions: function() {
    return this.morphMany(Reaction, 'reactionable')
  }

})

module.exports = Post
