const _ = require('underscore')

const genres = require('./fixtures/genres')
const companies = require('./fixtures/companies')
const movies = require('./fixtures/movies')
const celebrities = require('./fixtures/celebrities')

const genresMovies = require('./fixtures/genres_movies')
const companiesMovies = require('./fixtures/companies_movies')
const credits = require('./fixtures/credits')

const users = require('./fixtures/users')
const posts = require('./fixtures/posts')
const comments = require('./fixtures/comments')
const favorites = require('./fixtures/favorites')
const recommendations = require('./fixtures/recommendations')
const reactions = require('./fixtures/reactions')

const medias = require('./fixtures/medias')
const friendships = require('./fixtures/friendships')

exports.seed = async (knex) => {
    await addToDatabase('genres', genres, knex)
    await addToDatabase('companies', companies, knex)
    await addToDatabase('movies', movies, knex)
    await addToDatabase('celebrities', celebrities, knex)

    await addToDatabase('genres_movies', genresMovies, knex)
    await addToDatabase('companies_movies', companiesMovies, knex)
    await addToDatabase('credits', credits, knex)

    await addToDatabase('users', users, knex)
    await addToDatabase('posts', posts, knex)
    await addToDatabase('comments', comments, knex)
    await addToDatabase('favorites', favorites, knex)
    await addToDatabase('recommendations', recommendations, knex)
    await addToDatabase('reactions', reactions, knex)

    await addToDatabase('medias', medias, knex)
    await addToDatabase('friendships', friendships, knex)
}

const addTimestamps = (data) => {
  return _.extend(data, {
    created_at: new Date(), updated_at: new Date()
  })
}

const addToDatabase = async (tableName, data, knex) => {
  console.log(`-> Adding ${data.length} ${tableName}.`)
  await knex(tableName).del()
  await knex(tableName).insert(data.map(addTimestamps))
}
