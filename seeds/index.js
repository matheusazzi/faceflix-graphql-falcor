const genres = require('./fixtures/genres')
const companies = require('./fixtures/companies')
const titles = require('./fixtures/titles')
const celebrities = require('./fixtures/celebrities')

const genresTitles = require('./fixtures/genres_titles')
const companiesTitles = require('./fixtures/companies_titles')
const credits = require('./fixtures/credits')

const users = require('./fixtures/users')
const posts = require('./fixtures/posts')
const comments = require('./fixtures/comments')
const favorites = require('./fixtures/favorites')
const recommendations = require('./fixtures/recommendations')
// const reactions = require('./fixtures/reactions')
// const medias = require('./fixtures/medias')
// const friends = require('./fixtures/friends')

exports.seed = (knex, Promise) => {
  return Promise.all([
    addToDatabase('genres', genres, knex),
    addToDatabase('companies', companies, knex),
    addToDatabase('titles', titles, knex),
    addToDatabase('celebrities', celebrities, knex),

    addToDatabase('genres_titles', genresTitles, knex),
    addToDatabase('companies_titles', companiesTitles, knex),
    addToDatabase('credits', credits, knex),

    addToDatabase('users', users, knex),
    addToDatabase('posts', posts, knex),
    addToDatabase('comments', comments, knex),
    addToDatabase('favorites', favorites, knex),
    addToDatabase('recommendations', recommendations, knex)
  ])
}

const addToDatabase = (tableName, data, knex) => {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex(tableName).insert(data)
    })
}
