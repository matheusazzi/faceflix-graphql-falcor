import Router from 'falcor-router'

import comments from './routes/comments'
import medias from './routes/medias'
import movies from './routes/movies'
import posts from './routes/posts'
import users from './routes/users'

const loadRoutes = [].concat(
  comments,
  medias,
  movies,
  posts,
  users
)

const FalcorRoutes = new Router.createClass(loadRoutes)

export default new FalcorRoutes()
