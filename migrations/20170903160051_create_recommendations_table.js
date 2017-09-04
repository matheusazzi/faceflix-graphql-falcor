exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('recommendations', (t) => {
      t.increments('id').primary()

      t.integer('user_id').notNullable()
      t.integer('title_id').notNullable()

      t.foreign(['user_id', 'title_id'])
        .references(['users.id', 'titles.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('recommendations')
  ])
}
