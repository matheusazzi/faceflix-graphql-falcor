import * as g from 'graphql'

import { findById, timestamps } from './../utils'

import Movie from './../../models/movie'
import User from './../../models/user'

import MovieType from './movie_type'
import UserType from './user_type'

const RecommendationType = new g.GraphQLObjectType({
  name: 'Recommendation',

  fields: () => ({
    id: { type: g.GraphQLID },
    movie: {
      type: MovieType,
      resolve: credit => findById(Movie, credit.movie_id)
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
