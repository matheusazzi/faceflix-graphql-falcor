exports.seed = (knex, Promise) => {
  const tableName = 'users'

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex(tableName).insert([
        { name: 'Matheus', email: 'matheus.azzi@gmail.com' }
      ])
    })
}
