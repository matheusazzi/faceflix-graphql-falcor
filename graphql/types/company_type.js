import * as g from 'graphql'

import { timestamps } from './../utils'

import Title from './../../models/title'

import TitleType from './title_type'

const CompanyType = new g.GraphQLObjectType({
  name: 'Company',

  fields: () => ({
    id: { type: g.GraphQLID },
    name: { type: g.GraphQLString },
    titles: {
      type: new g.GraphQLList(TitleType),
      resolve: company => {
        return Title.query((qb) => {
          qb.innerJoin('companies_titles', 'titles.id', 'companies_titles.title_id')
          qb.where('companies_titles.company_id', company.id)
        })
          .fetchAll()
          .then((titles) => titles.serialize())
      }
    },
    createdAt: timestamps('a empresa').createdAt,
    updatedAt: timestamps('a empresa').updatedAt
  })
})

export default CompanyType
