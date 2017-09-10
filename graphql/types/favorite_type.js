import * as g from 'graphql'

import { findById, timestamps } from './../utils'

import User from './../../models/user'
import Movie from './../../models/movie'

import UserType from './user_type'
import MovieType from './movie_type'

const FavoriteType = new g.GraphQLObjectType({
  name: 'Favorite',

  fields: () => ({
    id: { type: g.GraphQLID },
    user: {
      type: UserType,
      resolve: favorite => findById(User, favorite.user_id)
    },
    movie: {
      type: MovieType,
      resolve: favorite => findById(Movie, favorite.movie_id)
    },
    createdAt: timestamps('o favorito').createdAt,
    updatedAt: timestamps('o favorito').updatedAt
  })
})

export default FavoriteType
