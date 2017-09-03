exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('medias', (t) => {
      t.increments('id').primary()

      t.string('video_url')
      t.string('image_url')

      t.integer('attachable_id')
      t.string('attachable_type')

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('medias')
  ])
}
