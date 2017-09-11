exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('medias', (t) => {
      t.increments('id').primary()

      t.string('video_url')
      t.string('image_url')

      t.integer('attachable_id').notNullable()
      t.string('attachable_type').notNullable()
      t.enu('type', ['image', 'video']).notNullable()

      t.foreign(['attachable_id', 'reactionable_id', 'type'])

      t.timestamps()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTableIfExists('medias')
  ])
}
