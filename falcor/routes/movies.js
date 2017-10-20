import Media from './../../models/media'
import Movie from './../../models/movie'

import {
  serialize,
  whereIn,
  columns
} from './../../models/utils'

import { ref as $ref } from 'falcor-json-graph'

const routes = [{
  route: `moviesById[{integers:movieIds}][${columns('movies')}]`,

  async get(pathSet) {
    const movies = await whereIn(Movie, pathSet.movieIds)
    const results = []

    movies.forEach((movie) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['moviesById', movie.id, key],
          value: movie[key]
        })
      })
    })

    return results
  }
}, {
  route: `moviesById[{integers:movieIds}].poster`,

  async get(pathSet) {
    const medias = await Media.query((qb) => {
      qb.where('medias.attachable_id', 'IN', pathSet.movieIds)
      qb.where('attachable_type', 'movies')
      qb.where('type', 'image')
    })
      .fetchAll()
      .then(serialize)

    const results = []

    medias.forEach((media, i) => {
      results.push({
        path: ['moviesById', pathSet.movieIds[i], 'poster'],
        value: $ref(['mediasById', media.id])
      })
    })

    return results
  }
}, {
  route: `moviesById[{integers:movieIds}].trailer`,

  async get(pathSet) {
    const medias = await Media.query((qb) => {
      qb.where('medias.attachable_id', 'IN', pathSet.movieIds)
      qb.where('attachable_type', 'movies')
      qb.where('type', 'video')
    })
      .fetchAll()
      .then(serialize)

    const results = []

    medias.forEach((media, i) => {
      results.push({
        path: ['moviesById', pathSet.movieIds[i], 'trailer'],
        value: $ref(['mediasById', media.id])
      })
    })

    return results
  }
}]

export default routes
