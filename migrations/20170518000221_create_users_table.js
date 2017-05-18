exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (t) => {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('email').unique().notNullable()
      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
}
