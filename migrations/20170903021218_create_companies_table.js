exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('companies', (t) => {
      t.increments('id').primary()

      t.string('name').unique().notNullable()

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('companies')
  ])
}
