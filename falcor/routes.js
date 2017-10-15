import _ from 'lodash'
import Router from 'falcor-router'
import jsonGraph from 'falcor-json-graph'

import Post from './../models/post'
import User from './../models/user'
import Media from './../models/media'
import Movie from './../models/movie'
import Comment from './../models/comment'

import { findById, where, whereAll } from './../graphql/utils'

const $ref = jsonGraph.ref

const quote = a => `'${a}'`

const columns = table => {
  return _.chain(
    require(`./../seeds/fixtures/${table}`)[0]
  ).keys().concat(
    ['id', 'created_at', 'updated_at']
  ).uniq().map(quote).join(',').value()
}

const FalcorRoutes = new Router.createClass([{
  route: `postById[{integers:postIds}][${columns('posts')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const results = []

    pathSet[2].map((key) => {
      results.push({
        path: ['postById', post.id, key],
        value: post[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].author[${columns('users')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const user = await findById(User, post.user_id)
    const results = []

    pathSet[3].map((key) => {
      results.push({
        path: ['postById', post.id, 'author', key],
        value: user[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].author.avatar[${columns('medias')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const media = await where(Media, {
      attachable_id: post.user_id,
      attachable_type: 'users'
    })
    const results = []

    pathSet[4].map((key) => {
      results.push({
        path: ['postById', post.id, 'author', 'avatar', key],
        value: media[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie[${columns('movies')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const movie = await findById(Movie, post.movie_id)
    const results = []

    pathSet[3].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', key],
        value: movie[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie.poster[${columns('medias')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const media = await where(Media, {
      attachable_id: post.movie_id,
      attachable_type: 'movies',
      type: 'image'
    })
    const results = []

    pathSet[4].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', 'poster', key],
        value: media[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].movie.trailer[${columns('medias')}]`,

  async get(pathSet) {
    const post = await findById(Post, pathSet.postIds[0])
    const media = await where(Media, {
      attachable_id: post.movie_id,
      attachable_type: 'movies',
      type: 'video'
    })
    const results = []

    pathSet[4].map((key) => {
      results.push({
        path: ['postById', post.id, 'movie', 'trailer', key],
        value: media[key]
      })
    })

    return results
  }
}, {
  route: `postById[{integers:postIds}].comments[{integers:commentsIndices}]`,

  async get(pathSet) {
    const comments = await whereAll(Comment, {
      post_id: pathSet.postIds[0]
    })
    const results = []

    pathSet.commentsIndices.forEach((index) => {
      if (comments[index]) {
        results.push({
          path: ['postById', comments[0].post_id, 'comments', index],
          value: $ref(['commentsById', comments[index].id])
        })
      }
    })

    return results
  }
}, {
  route: `commentsById[{integers:commentsIds}][${columns('comments')}]`,

  async get(pathSet) {
    const comments = await Comment.query((qb) => {
      qb.where('comments.id', 'IN', pathSet.commentsIds)
    })
      .fetchAll()
      .then((res) => res.serialize())

    const results = []

    comments.forEach((comment) => {
      pathSet[2].map((key) => {
        results.push({
          path: ['commentsById', comment.id, key],
          value: comment[key]
        })
      })
    })

    return results
  }
}])

export default new FalcorRoutes()
