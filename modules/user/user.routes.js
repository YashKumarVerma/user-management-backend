const express = require('express')
const router = express.Router()
const logger = require('./../../logging/logger')
const { UserOperations } = require('./user.controller')

router.post('/create', (req, res) => {
  UserOperations.createNewUser(req.body)
    .then((newUser) => {
      logger.info(`New User ${newUser.username} created`)
      res.json({
        error: false,
        message: 'New User registered successfully'
      })
    })
    .catch((error) => {
      if (error.errmsg) {
        logger.error(`DB : ${error.errmsg}`)
        return res.json({
          error: true,
          type: 'database',
          message: `${error.errmsg}`
        })
      }

      if (error.errors) {
        logger.error(`Validation: ${error.message}`)
        return res.json({
          error: true,
          type: 'validation',
          message: error.message,
          value: error.value
        })
      }

      return res.json({
        error: true,
        type: 'undefined',
        message: 'undefined error',
        value: error
      })
    })
})

router.post('/delete', (req, res) => {
  if (!req.body.username) {
    return res.json({
      error: true,
      type: 'incomplete',
      message: 'Username required to delete user'
    })
  }

  UserOperations.deleteUser(req.body.username)
    .then((resp) => {
      if (resp.deletedCount === 1) {
        return res.json({
          error: false,
          message: 'user deletion successful'
        })
      }

      return res.json({
        error: true,
        type: 'input mismatch',
        message: 'username not found'
      })
    })
    .catch((err) => {
      console.log('error')
      return res.json({
        error: true,
        type: 'database',
        message: 'error deleting user',
        value: err
      })
    })
})

module.exports = router
