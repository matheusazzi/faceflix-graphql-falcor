import * as g from 'graphql'

import Media from './../../models/media'

import MediaType from './media_type'

const UserType = new g.GraphQLObjectType({
  name: 'User',

  fields: () => ({
    id: {
      type: g.GraphQLID
    },
    name: {
      type: g.GraphQLString
    },
    email: {
      type: g.GraphQLString
    },
    gender: {
      type: g.GraphQLString,
      description: 'Retorna "male" ou "female"'
    },
    createdAt: {
      type: g.GraphQLString,
      description: 'Data de criação do usuário.',
      resolve: user => user.created_at
    },
    updatedAt: {
      type: g.GraphQLString,
      description: 'Data da última alteração no usuário.',
      resolve: user => user.updated_at
    },
    avatar: {
      type: MediaType,
      description: 'Foto do usuário.',
      resolve: user => {
        return Media.where({attachable_id: user.id, attachable_type: 'users'})
          .fetch().then((res) => res.serialize())
      }
    }
  })
})

export default UserType
