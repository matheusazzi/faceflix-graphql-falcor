exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('posts', (t) => {
      t.increments('id').primary()

      t.text('body').notNullable()

      t.integer('author_id').references('users.id')
      t.integer('title_id').references('titles.id')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('posts')
  ])
}
