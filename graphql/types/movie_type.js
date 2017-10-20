import * as g from 'graphql'
import _ from 'underscore'

import { timestamps, where, whereAll } from './../utils'

import Media from './../../models/media'
import Celebrity from './../../models/celebrity'
import Credit from './../../models/credit'
import Company from './../../models/company'
import Genre from './../../models/genre'
import Post from './../../models/post'
import Favorite from './../../models/favorite'
import Recommendation from './../../models/recommendation'

import MediaType from './media_type'
import CelebrityType from './celebrity_type'
import CreditType from './credit_type'
import CompanyType from './company_type'
import GenreType from './genre_type'
import PostType from './post_type'
import FavoriteType from './favorite_type'
import RecommendationType from './recommendation_type'

const MovieType = new g.GraphQLObjectType({
  name: 'Movie',

  fields: () => ({
    id: { type: g.GraphQLID },
    budget: {
      type: g.GraphQLInt,
      description: 'Orçamento do filme.'
    },
    revenue: {
      type: g.GraphQLInt,
      description: 'Receita do filme.'
    },
    runtime: {
      type: g.GraphQLInt,
      description: 'Duração do filme.'
    },
    title: {
      type: g.GraphQLString,
      description: 'Título do filme.'
    },
    rating: {
      type: g.GraphQLFloat,
      description: 'Nota média do filme.'
    },
    overview: {
      type: g.GraphQLString,
      description: 'Sinopse do filme.'
    },
    tagline: {
      type: g.GraphQLString,
      description: 'Slogan do filme.'
    },
    releaseDate: {
      type: g.GraphQLString,
      description: 'Data de lançamento do filme.',
      resolve: (movie) => movie.release_date
    },
    poster: {
      type: MediaType,
      description: 'Poster do filme.',
      resolve: movie => where(Media, {
        attachable_id: movie.id,
        attachable_type: 'movies',
        type: 'image'
      })
    },
    trailer: {
      type: MediaType,
      description: 'Trailer do filme.',
      resolve: movie => where(Media, {
        attachable_id: movie.id,
        attachable_type: 'movies',
        type: 'video'
      })
    },
    crew: {
      type: new g.GraphQLList(CreditType),
      args: {
        first: { type: g.GraphQLInt },
        last: { type: g.GraphQLInt }
      },
      description: 'Equipe principal do filme.',
      resolve: async (movie, params) => {
        const data = await whereAll(Credit, { movie_id: movie.id })

        if (params.first) {
          return _.first(data, params.first)
        } else if (params.last) {
          return _.last(data, params.last)
        } else {
          return data
        }
      }
    },
    director: {
      type: CelebrityType,
      description: 'Diretor do filme.',
      resolve: movie => {
        return Celebrity.query((qb) => {
          qb.innerJoin('credits', 'celebrities.id', 'credits.celebrity_id')
          qb.where('credits.movie_id', movie.id)
          qb.where('credits.role', 'director')
        })
          .fetch()
          .then((director) => director.serialize())
      }
    },
    companies: {
      type: new g.GraphQLList(CompanyType),
      description: 'Empresas produtoras do filme.',
      resolve: movie => {
        return Company.query((qb) => {
          qb.innerJoin('companies_movies', 'companies.id', 'companies_movies.company_id')
          qb.where('companies_movies.movie_id', movie.id)
        })
          .fetchAll()
          .then((companies) => companies.serialize())
      }
    },
    genres: {
      type: new g.GraphQLList(GenreType),
      description: 'Gêneros do filme.',
      resolve: movie => {
        return Genre.query((qb) => {
          qb.innerJoin('genres_movies', 'genres.id', 'genres_movies.company_id')
          qb.where('genres_movies.movie_id', movie.id)
        })
          .fetchAll()
          .then((genres) => genres.serialize())
      }
    },
    posts: {
      type: new g.GraphQLList(PostType),
      resolve: movie => whereAll(Post, {movie_id: movie.id})
    },
    favorites: {
      type: new g.GraphQLList(FavoriteType),
      resolve: movie => whereAll(Favorite, {movie_id: movie.id})
    },
    recommendations: {
      type: new g.GraphQLList(RecommendationType),
      resolve: movie => whereAll(Recommendation, { movie_id: movie.id })
    },
    createdAt: timestamps('a título').createdAt,
    updatedAt: timestamps('a título').updatedAt
  })
})

export default MovieType
