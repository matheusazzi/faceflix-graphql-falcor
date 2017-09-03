exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('credits', (t) => {
      t.increments('id').primary()

      t.integer('celebrity_id').references('celebrities.id')
      t.integer('author_id').references('users.id')
      t.integer('title_id').references('titles.id')

      t.enu('role', ['director', 'writer', 'actor'])
      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('credits')
  ])
}