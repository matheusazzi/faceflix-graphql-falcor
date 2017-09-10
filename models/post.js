const DB = require('./../config/db')

const User = require('./user')
const Movie = require('./movie')
const Comment = require('./comment')
const Reaction = require('./reaction')

const Post = DB.Model.extend({
  tableName: 'posts',

  hasTimestamps: true,

  author: function() {
    return this.bolongsTo(User)
  },

  movie: function() {
    return this.belongsTo(Movie)
  },

  comments: function() {
    return this.hasMany(Comment)
  },

  reactions: function() {
    return this.morphMany(Reaction, 'reactionable')
  }

})

module.exports = Post
