exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('friendships', (t) => {
      t.increments('id').primary()

      t.enu('status', ['pending', 'approved']).notNullable()
      t.integer('user_one_id').notNullable()
      t.integer('user_two_id').notNullable()

      t.foreign(['user_one_id', 'user_two_id'])
        .references(['users.id', 'users.id'])

      t.foreign(['user_two_id', 'user_one_id'])
        .references(['users.id', 'users.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('friendships')
  ])
}
