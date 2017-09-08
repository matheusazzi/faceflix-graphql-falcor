import express from 'express'
import bodyParser from 'body-parser'
import graphQLHTTP from 'express-graphql'

import routes from './config/routes'
import schema from './graphql/schema'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use(graphQLHTTP({
  schema,
  graphiql: true
}))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ error: err.message })
})

module.exports = app
