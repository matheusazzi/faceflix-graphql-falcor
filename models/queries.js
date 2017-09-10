import * as g from 'graphql'

const findById = (model, id) => {
  return model.where({ id: id }).fetch()
    .then((res) => res.serialize())
}

const where = (model, clause) => {
  return model.where(clause).fetchAll()
    .then((res) => res.serialize())
}

const timestamps = (text) => {
  return {
    createdAt: {
      type: g.GraphQLString,
      description: `Data de criação d${text}.`,
      resolve: user => user.created_at
    },
    updatedAt: {
      type: g.GraphQLString,
      description: `Data da última alteração n${text}.`,
      resolve: user => user.updated_at
    }
  }
}

export { findById, where, timestamps }
