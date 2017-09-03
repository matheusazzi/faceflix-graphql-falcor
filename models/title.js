const DB = require('./../db')

const Media = require('./media')
const Credit = require('./credit')
const Post = require('./post')
const Favorite = require('./favorite')
const Recommendation = require('./recommendation')
const Genre = require('./genre')
const Company = require('./company')

const Title = DB.Model.extend({
  tableName: 'titles',

  defaults: {
  },

  hasTimestamps: true,

  cover: function() {
    return this.morphOne(Media, 'attachable')
  },

  crew: function() {
    return this.hasMany(Credit)
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

  genres: function() {
    return this.belongsToMany(Genre)
  },

  companies: function() {
    return this.belongsToMany(Company)
  }

})

module.exports = Title
