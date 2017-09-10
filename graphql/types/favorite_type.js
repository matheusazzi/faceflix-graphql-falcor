import * as g from 'graphql'

import { findById, timestamps } from './../../models/queries'

import User from './../../models/user'
import Title from './../../models/title'

import UserType from './user_type'
import TitleType from './title_type'

const FavoriteType = new g.GraphQLObjectType({
  name: 'Favorite',

  fields: () => ({
    id: { type: g.GraphQLID },
    user: {
      type: UserType,
      resolve: favorite => findById(User, favorite.user_id)
    },
    title: {
      type: TitleType,
      resolve: favorite => findById(Title, favorite.title_id)
    },
    createdAt: timestamps('o favorito').createdAt,
    updatedAt: timestamps('o favorito').updatedAt
  })
})

export default FavoriteType
