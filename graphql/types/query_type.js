import * as g from 'graphql'
import * as _ from 'underscore'

import { findById } from './../utils'

import Celebrity from './../../models/celebrity'
import Comment from './../../models/comment'
import Company from './../../models/company'
import Credit from './../../models/credit'
import Favorite from './../../models/favorite'
import Genre from './../../models/genre'
import Media from './../../models/media'
import Movie from './../../models/movie'
import Post from './../../models/post'
import Reaction from './../../models/reaction'
import Recommendation from './../../models/recommendation'
import User from './../../models/user'

import CelebrityType from './celebrity_type'
import CommentType from './comment_type'
import CompanyType from './company_type'
import CreditType from './credit_type'
import FavoriteType from './favorite_type'
import GenreType from './genre_type'
import MediaType from './media_type'
import MovieType from './movie_type'
import PostType from './post_type'
import ReactionType from './reaction_type'
import RecommendationType from './recommendation_type'
import UserType from './user_type'

const byId = (model, type, text) => {
  return {
    description: `Retorna ${text}.`,
    type: type,
    args: {
      id: { type: new g.GraphQLNonNull(g.GraphQLID) }
    },
    resolve: (root, params) => findById(model, params.id)
  }
}

const all = (model, type, article, table) => {
  return {
    description: `Retorna tod${article} ${article} ${table}.`,
    type: new g.GraphQLList(type),
    args: {
      first: {
        type: g.GraphQLInt,
        description: `Retorna ${article} N primeir${article} ${table}.`
      },
      last: {
        type: g.GraphQLInt,
        description: `Retorna ${article} N últim${article} ${table}.`
      }
    },
    resolve: async (root, params) => {
      const res = await model.fetchAll()
      const data = await res.serialize()

      if (params.first) {
        return _.first(data, params.first)
      } else if (params.last) {
        return _.last(data, params.last)
      } else {
        return data
      }
    }
  }
}

const QueryType = new g.GraphQLObjectType({
  name: 'Query',
  description: 'Query Inicial',

  fields: () => ({
    celebrity: byId(Celebrity, CelebrityType, 'uma celebridade'),
    allCelebrities: all(Celebrity, CelebrityType, 'as', 'celebridades'),
    comment: byId(Comment, CommentType, 'um comentário'),
    allComments: all(Comment, CommentType, 'os', 'comentários'),
    company: byId(Company, CompanyType, 'uma empresa'),
    allCompanies: all(Company, CompanyType, 'as', 'empresas'),
    credit: byId(Credit, CreditType, 'um crédito'),
    allCredits: all(Credit, CreditType, 'os', 'créditos'),
    favorite: byId(Favorite, FavoriteType, 'um favorito'),
    allFavorites: all(Favorite, FavoriteType, 'os', 'favoritos'),
    genre: byId(Genre, GenreType, 'um gênero'),
    allGenres: all(Genre, GenreType, 'os', 'gêneros'),
    media: byId(Media, MediaType, 'uma mídia'),
    allMedias: all(Media, MediaType, 'as', 'mídias'),
    movie: byId(Movie, MovieType, 'um filme'),
    allMovies: all(Movie, MovieType, 'os', 'filmes'),
    post: byId(Post, PostType, 'uma postagem'),
    allPosts: all(Post, PostType, 'as', 'postagens'),
    reaction: byId(Reaction, ReactionType, 'uma reação'),
    allReactions: all(Reaction, ReactionType, 'as', 'reações'),
    recommendation: byId(Recommendation, RecommendationType, 'uma recomendação'),
    allRecommendations: all(Recommendation, RecommendationType, 'as', 'recomendações'),
    user: byId(User, UserType, 'um usuário'),
    allUsers: all(User, UserType, 'os', 'usuários'),
  })
})

export default QueryType
