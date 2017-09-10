import * as g from 'graphql'

import { findById, timestamps } from './../../models/queries'

import Title from './../../models/title'
import User from './../../models/user'

import TitleType from './title_type'
import UserType from './user_type'

const RecommendationType = new g.GraphQLObjectType({
  name: 'Recommendation',

  fields: () => ({
    id: { type: g.GraphQLID },
    title: {
      type: TitleType,
      resolve: credit => findById(Title, credit.title_id)
    },
    user: {
      type: UserType,
      resolve: credit => findById(User, credit.user_id)
    },
    createdAt: timestamps('a recomendação').createdAt,
    updatedAt: timestamps('a recomendação').updatedAt
  })
})

export default RecommendationType
