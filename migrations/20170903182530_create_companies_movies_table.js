exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('companies_movies', (t) => {
      t.increments('id').primary()

      t.integer('company_id').notNullable()
      t.integer('movie_id').notNullable()

      t.foreign(['company_id', 'movie_id'])
        .references(['companies.id', 'movies.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('companies_movies')
  ])
}
