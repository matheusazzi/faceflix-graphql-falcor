exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('titles', (t) => {
      t.increments('id').primary()

      t.string('title').notNullable()
      t.text('overview').notNullable()
      t.string('tagline')
      t.integer('runtime')
      t.bigInteger('budget')
      t.bigInteger('revenue')
      t.decimal('rating')
      t.date('release_date')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('titles')
  ])
}
