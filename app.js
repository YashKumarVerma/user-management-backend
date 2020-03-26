const app = require('express')()

const compression = require('compression')
const sanitizer = require('express-sanitizer')
const parser = require('body-parser')
const morgan = require('./logging/morgan')
const database = require('./modules/mongoose/connect')

// Middlewares
app.use(sanitizer())
app.use(parser.json())
app.use(compression())

// Logging

app.use(morgan)

// Define routes
app.use('/user', require('./modules/user/user.routes'))

module.exports = app
