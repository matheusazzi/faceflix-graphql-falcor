import Media from './../../models/media'

import {
  whereIn,
  columns
} from './../../models/utils'

import { ref as $ref } from 'falcor-json-graph'

const routes = [{
  route: `mediasById[{integers:mediaIds}][${columns('medias')}]`,

  async get(pathSet) {
    const medias = await whereIn(Media, pathSet.mediaIds)
    const results = []

    medias.forEach((media) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['mediasById', media.id, key],
          value: media[key]
        })
      })
    })

    return results
  }
}]

export default routes
