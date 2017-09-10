import * as g from 'graphql'

import { timestamps } from './../utils'

import Movie from './../../models/movie'

import MovieType from './movie_type'

const CompanyType = new g.GraphQLObjectType({
  name: 'Company',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: { type: g.GraphQLString },
    movies: {
      type: new g.GraphQLList(MovieType),
      resolve: company => {
        return Movie.query((qb) => {
          qb.innerJoin('companies_movies', 'movies.id', 'companies_movies.movie_id')
          qb.where('companies_movies.company_id', company.id)
        })
          .fetchAll()
          .then((movies) => movies.serialize())
      }
    },
    createdAt: timestamps('a empresa').createdAt,
    updatedAt: timestamps('a empresa').updatedAt
  })
})

export default CompanyType
