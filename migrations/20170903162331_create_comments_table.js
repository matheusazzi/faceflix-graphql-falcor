exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('comments', (t) => {
      t.increments('id').primary()

      t.text('body').notNullable()

      t.integer('user_id').references('users.id')
      t.integer('post_id').references('posts.id')
      t.integer('movie_id')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('comments')
  ])
}
