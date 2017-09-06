exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('reactions', (t) => {
      t.increments('id').primary()

      t.enu('type', ['like', 'dislike'])

      t.integer('user_id').references('users.id')

      t.integer('reactionable_id').notNullable()
      t.string('reactionable_type').notNullable()

      t.foreign(['user_id', 'reactionable_id', 'reactionable_type'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('reactions')
  ])
}
