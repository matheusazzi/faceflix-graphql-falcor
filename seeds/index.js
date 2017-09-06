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
const reactions = require('./fixtures/reactions')

const medias = require('./fixtures/medias')
const friendships = require('./fixtures/friendships')

exports.seed = async (knex) => {
    await addToDatabase('genres', genres, knex)
    await addToDatabase('companies', companies, knex)
    await addToDatabase('titles', titles, knex)
    await addToDatabase('celebrities', celebrities, knex)

    await addToDatabase('genres_titles', genresTitles, knex)
    await addToDatabase('companies_titles', companiesTitles, knex)
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

const addToDatabase = async (tableName, data, knex) => {
  await knex(tableName).del()
  await knex(tableName).insert(data)
}
