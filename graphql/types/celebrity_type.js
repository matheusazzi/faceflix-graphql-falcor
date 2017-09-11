import * as g from 'graphql'

import { timestamps, where, whereAll } from './../utils'

import Media from './../../models/media'
import Credit from './../../models/credit'

import MediaType from './media_type'
import CreditType from './credit_type'

const CelebrityType = new g.GraphQLObjectType({
  name: 'Celebrity',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: {
      type: g.GraphQLString,
      description: 'Nome da celebridade.'
    },
    gender: {
      type: g.GraphQLString,
      description: 'Retorna "male" ou "female".'
    },
    birthday: { type: g.GraphQLString },
    biography: { type: g.GraphQLString },
    avatar: {
      type: MediaType,
      description: 'Foto da celebridade.',
      resolve: celebrity => where(Media, {
        attachable_id: celebrity.id,
        attachable_type: 'celebrities'
      })
    },
    works: {
      type: new g.GraphQLList(CreditType),
      description: 'Participações em filmes.',
      resolve: celebrity => whereAll(Credit, {celebrity_id: celebrity.id})
    },
    createdAt: timestamps('a celebridade').createdAt,
    updatedAt: timestamps('a celebridade').updatedAt
  })
})

export default CelebrityType
