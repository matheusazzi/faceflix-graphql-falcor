exports.seed = (knex, Promise) => {
  const tableName = 'users'

  const data = [{
    name: 'Matheus',
    email: 'matheus.azzi@gmail.com',
    gender: 'male'
  }]

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(() => {
      // Inserts seed entries
      return knex(tableName).insert(data)
    })
}
