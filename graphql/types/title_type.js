import * as g from 'graphql'

import { timestamps, where } from './../../models/queries'

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

const TitleType = new g.GraphQLObjectType({
  name: 'Title',

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
      resolve: (title) => title.release_date
    },
    poster: {
      type: MediaType,
      description: 'Poster do título.',
      resolve: title => where(Media, {
        attachable_id: title.id,
        attachable_type: 'titles'
      })
    },
    crew: {
      type: new g.GraphQLList(CreditType),
      resolve: title => where(Credit, {title_id: title.id})
    },
    companies: {
      type: new g.GraphQLList(CompanyType),
      resolve: title => {
        return Company.query((qb) => {
          qb.innerJoin('companies_titles', 'companies.id', 'companies_titles.company_id')
          qb.where('companies_titles.title_id', title.id)
        })
          .fetchAll()
          .then((companies) => companies.serialize())
      }
    },
    genres: {
      type: new g.GraphQLList(GenreType),
      resolve: title => {
        return Genre.query((qb) => {
          qb.innerJoin('genres_titles', 'genres.id', 'genres_titles.company_id')
          qb.where('genres_titles.title_id', title.id)
        })
          .fetchAll()
          .then((genres) => genres.serialize())
      }
    },
    posts: {
      type: new g.GraphQLList(PostType),
      resolve: title => where(Post, {title_id: title.id})
    },
    favorites: {
      type: new g.GraphQLList(FavoriteType),
      resolve: title => where(Favorite, {title_id: title.id})
    },
    recommendations: {
      type: new g.GraphQLList(RecommendationType),
      resolve: title => where(Recommendation, { title_id: title.id })
    },
    createdAt: timestamps('a título').createdAt,
    updatedAt: timestamps('a título').updatedAt
  })
})

export default TitleType
