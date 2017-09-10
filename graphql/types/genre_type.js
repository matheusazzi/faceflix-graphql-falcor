import * as g from 'graphql'

import { timestamps } from './../../models/queries'

import Title from './../../models/title'

import TitleType from './title_type'

const GenreType = new g.GraphQLObjectType({
  name: 'Genre',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: { type: g.GraphQLString },
    titles: {
      type: new g.GraphQLList(TitleType),
      resolve: genre => {
        return Title.query((qb) => {
          qb.innerJoin('genres_titles', 'titles.id', 'genres_titles.title_id')
          qb.where('genres_titles.genre_id', genre.id)
        })
          .fetchAll()
          .then((titles) => titles.serialize())
      }
    },
    createdAt: timestamps('o gênero').createdAt,
    updatedAt: timestamps('o gênero').updatedAt
  })
})

export default GenreType
