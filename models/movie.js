const DB = require('./../config/db')

const Media = require('./media')
const Credit = require('./credit')
const Post = require('./post')
const Favorite = require('./favorite')
const Recommendation = require('./recommendation')
const Genre = require('./genre')
const Company = require('./company')

const Movie = DB.Model.extend({
  tableName: 'movies',

  hasTimestamps: true,

  poster: function() {
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

module.exports = Movie
