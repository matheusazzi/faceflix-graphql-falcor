exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('celebrities', (t) => {
      t.increments('id').primary()

      t.string('name').notNullable()
      t.enu('gender', ['male', 'female']).notNullable()
      t.date('birthday')
      t.text('biography')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('celebrities')
  ])
}
