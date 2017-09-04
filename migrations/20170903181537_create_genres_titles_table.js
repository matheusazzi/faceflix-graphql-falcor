exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('genres_titles', (t) => {
      t.increments('id').primary()

      t.integer('genre_id').notNullable()
      t.integer('title_id').notNullable()

      t.foreign(['genre_id', 'title_id'])
        .references(['genres.id', 'titles.id'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('genres_titles')
  ])
}
