const DB = require('./../config/db')

const User = require('./user')
const Movie = require('./movie')
const Post = require('./post')
const Reaction = require('./reaction')

const Comment = DB.Model.extend({
  tableName: 'comments',

  hasTimestamps: true,

  author: function() {
    return this.bolongsTo(User)
  },

  movie: function() {
    return this.belongsTo(Movie)
  },

  post: function() {
    return this.belongsTo(Post)
  },

  reactions: function() {
    return this.morphMany(Reaction, 'reactionable')
  }

})

module.exports = Comment
