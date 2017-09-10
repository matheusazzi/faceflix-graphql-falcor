exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('recommendations', (t) => {
      t.increments('id').primary()

      t.integer('user_id').notNullable()
      t.integer('movie_id').notNullable()

      t.foreign(['user_id', 'movie_id'])
        .references(['users.id', 'movies.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('recommendations')
  ])
}
