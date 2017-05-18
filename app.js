const express = require('express')
const routes = require('./routes')
const app = express()

app.use('/', routes)
require('./config')(app)

module.exports = app
