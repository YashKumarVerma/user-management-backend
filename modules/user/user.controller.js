const logger = require('./../../logging/logger')
const UserSchema = require('./user.schema')
const bcrypt = require('bcrypt')

const saltRounds = 10

class UserOperations {
  static createNewUser (req, res) {
    const user = req.body.user
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        logger.error(err.errmsg)
      }
      user.password = hash
      return UserSchema.create(user).then((newUser) => {
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
  }

  static deleteUser (req, res) {
    if (!req.body.username) {
      return res.json({
        error: true,
        type: 'incomplete',
        message: 'Username required to delete user'
      })
    }

    UserSchema.deleteOne({
      username: req.body.username
    }).then((resp) => {
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
        logger.log('error')
        return res.json({
          error: true,
          type: 'database',
          message: 'error deleting user',
          value: err
        })
      })
  }

  static updateUser (req, res) {
    UserSchema.findByIdAndUpdate({ username: req.body.username }, { $set: req.body })
      .exec()
      .then(() => {
        return res.json({
          error: false,
          message: 'user updation successful'
        })
      })
      .catch((err) => {
        logger.log('error')
        return res.json({
          error: true,
          type: 'database',
          message: 'error updating user',
          value: err
        })
      })
  }

  static findUser (req, res) {
    UserSchema.findById(req.body.user._id)
      .then((user) => {
        console.log(req.body.user._id)
        return res.json({
          error: false,
          message: 'found user',
          user: user
        })
      })
      .catch((err) => {
        logger.error('error')
        return res.json({
          error: true,
          type: 'database',
          message: 'error finding user',
          value: err
        })
      })
  }

  static findUserByUsername (req, res) {
    UserSchema.findOne({ username: req.params.username })
      .then((user) => {
        return res.json({
          error: false,
          message: 'found user',
          user: user
        })
      })
      .catch((err) => {
        logger.error('error', err)
        return res.json({
          error: true,
          type: 'database',
          message: 'error finding user',
          value: err
        })
      })
  }
}

module.exports = UserOperations
