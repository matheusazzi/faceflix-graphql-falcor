exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('favorites', (t) => {
      t.increments('id').primary()

      t.integer('user_id').references('users.id')
      t.integer('title_id').references('titles.id')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('favorites')
  ])
}
