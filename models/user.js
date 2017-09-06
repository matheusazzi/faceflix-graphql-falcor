const DB = require('./../config/db')

const Media = require('./media')
const Comment = require('./comment')
const Post = require('./post')
const Favorite = require('./favorite')
const Recommendation = require('./recommendation')
const Reaction = require('./reaction')

const User = DB.Model.extend({
  tableName: 'users',

  defaults: {},

  hasTimestamps: true,

  avatar: function() {
    return this.morphOne(Media, 'attachable')
  },

  comments: function() {
    return this.hasMany(Comment)
  },

  posts: function() {
    return this.hasMany(Post)
  },

  favorites: function() {
    return this.hasMany(Favorite)
  },

  recommendations: function() {
    return this.hasMany(Recommendation)
  },

  reactions: function() {
    return this.hasMany(Reaction)
  }

})

module.exports = User
