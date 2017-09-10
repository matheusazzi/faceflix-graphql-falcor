import * as g from 'graphql'

import { findById, timestamps } from './../utils'

import Movie from './../../models/movie'
import Celebrity from './../../models/celebrity'

import MovieType from './movie_type'
import CelebrityType from './celebrity_type'

const CreditType = new g.GraphQLObjectType({
  name: 'Credit',

  fields: () => ({
    id: { type: g.GraphQLID },
    role: { type: g.GraphQLString },
    movie: {
      type: MovieType,
      resolve: credit => findById(Movie, credit.movie_id)
    },
    celebrity: {
      type: CelebrityType,
      resolve: credit => findById(Celebrity, credit.celebrity_id)
    },
    createdAt: timestamps('o crédito').createdAt,
    updatedAt: timestamps('o crédito').updatedAt
  })
})

export default CreditType
