import * as g from 'graphql'
import { findById, where, whereAll } from './../models/utils'

const timestamps = (text) => {
  return {
    createdAt: {
      type: g.GraphQLString,
      description: `Data de criação d${text}.`,
      resolve: record => record.created_at
    },
    updatedAt: {
      type: g.GraphQLString,
      description: `Data da última alteração n${text}.`,
      resolve: record => record.updated_at
    }
  }
}

export { findById, where, whereAll, timestamps }
