import * as g from 'graphql'

import { timestamps, where } from './../utils'

import Media from './../../models/media'
import Credit from './../../models/credit'
import Company from './../../models/company'
import Genre from './../../models/genre'
import Post from './../../models/post'
import Favorite from './../../models/favorite'
import Recommendation from './../../models/recommendation'

import MediaType from './media_type'
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
    budget: { type: g.GraphQLInt },
    revenue: { type: g.GraphQLInt },
    runtime: { type: g.GraphQLInt },
    title: { type: g.GraphQLString },
    rating: { type: g.GraphQLFloat },
    overview: { type: g.GraphQLString },
    tagline: { type: g.GraphQLString },
    releaseDate: {
      type: g.GraphQLString,
      resolve: (movie) => movie.release_date
    },
    poster: {
      type: MediaType,
      description: 'Poster do título.',
      resolve: movie => where(Media, {
        attachable_id: movie.id,
        attachable_type: 'movies'
      })
    },
    crew: {
      type: new g.GraphQLList(CreditType),
      resolve: movie => where(Credit, {movie_id: movie.id})
    },
    companies: {
      type: new g.GraphQLList(CompanyType),
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
      resolve: movie => where(Post, {movie_id: movie.id})
    },
    favorites: {
      type: new g.GraphQLList(FavoriteType),
      resolve: movie => where(Favorite, {movie_id: movie.id})
    },
    recommendations: {
      type: new g.GraphQLList(RecommendationType),
      resolve: movie => where(Recommendation, { movie_id: movie.id })
    },
    createdAt: timestamps('a título').createdAt,
    updatedAt: timestamps('a título').updatedAt
  })
})

export default MovieType
