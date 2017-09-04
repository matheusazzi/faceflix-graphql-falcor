exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('companies_titles', (t) => {
      t.increments('id').primary()

      t.integer('company_id').notNullable()
      t.integer('title_id').notNullable()

      t.foreign(['company_id', 'title_id'])
        .references(['companies.id', 'titles.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('companies_titles')
  ])
}
