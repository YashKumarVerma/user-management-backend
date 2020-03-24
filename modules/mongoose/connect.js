// load configurations
require('dotenv').config()

// load mongoose wrapper
const mongoose = require('mongoose')
const logger = require('./../../logging/logger')

// define an instance of database
class Database {
  constructor () {
    this._connect()
  }

  _connect () {
    mongoose
      .connect(
        'mongodb://localhost:27017/smoketrees' || process.env.DB_CONN_STRING,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }
      )
      .then(() => {
        logger.info('Database Connected')
      })
      .catch((err) => {
        logger.error('Database connection error')
        logger.error(err)
      })
  }
}

// pass instance of database
module.exports = new Database()
