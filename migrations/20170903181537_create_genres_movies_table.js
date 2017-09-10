exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('genres_movies', (t) => {
      t.increments('id').primary()

      t.integer('genre_id').notNullable()
      t.integer('movie_id').notNullable()

      t.foreign(['genre_id', 'movie_id'])
        .references(['genres.id', 'movies.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('genres_movies')
  ])
}
