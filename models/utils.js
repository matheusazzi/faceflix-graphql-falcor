import _ from 'underscore'

const serialize = (res) => res.serialize()

const findById = (model, id) => {
  return model.where({ id: id }).fetch()
    .then(serialize)
}

const where = (model, clause) => {
  return model.where(clause).fetch()
    .then(serialize)
}

const whereAll = (model, clause) => {
  return model.where(clause).fetchAll()
    .then(serialize)
}

const whereIn = (model, ids) => {
  const name = new model().tableName

  return model.query((qb) => {
    qb.where(`${name}.id`, 'IN', ids)
  }).fetchAll()
    .then(serialize)
}

const quote = a => `'${a}'`

const columns = table => {
  return _.chain(
    require(`./../seeds/fixtures/${table}`)[0]
  ).keys().union(
    ['id', 'created_at', 'updated_at']
  ).map(quote).join(',').value()
}

export {
  serialize,
  findById,
  where,
  whereAll,
  whereIn,
  quote,
  columns
}
