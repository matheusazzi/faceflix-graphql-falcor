exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('posts', (t) => {
      t.increments('id').primary()

      t.text('body').notNullable()

      t.integer('user_id').references('users.id')
      t.integer('movie_id').references('movies.id')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('posts')
  ])
}
