exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('credits', (t) => {
      t.increments('id').primary()

      t.integer('celebrity_id').references('celebrities.id')
      t.integer('movie_id').references('movies.id')

      t.enu('role', ['director', 'writer', 'actor', 'actress'])
      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('credits')
  ])
}
