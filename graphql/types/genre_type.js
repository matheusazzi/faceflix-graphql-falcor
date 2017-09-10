import * as g from 'graphql'

import { timestamps } from './../utils'

import Movie from './../../models/movie'

import MovieType from './movie_type'

const GenreType = new g.GraphQLObjectType({
  name: 'Genre',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: { type: g.GraphQLString },
    movies: {
      type: new g.GraphQLList(MovieType),
      description: 'Filmes enquadrados no gênero.',
      resolve: genre => {
        return Movie.query((qb) => {
          qb.innerJoin('genres_movies', 'movies.id', 'genres_movies.movie_id')
          qb.where('genres_movies.genre_id', genre.id)
        })
          .fetchAll()
          .then((movies) => movies.serialize())
      }
    },
    createdAt: timestamps('o gênero').createdAt,
    updatedAt: timestamps('o gênero').updatedAt
  })
})

export default GenreType
