const logger = require('./../../logging/logger')
const UserSchema = require('./user.schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const config = require('./config')

const saltRounds = 10

class UserOperations {
  static async createNewUser (user) {
    let response
    try {
      console.log(user)
      user.password = bcrypt.hashSync(user.password, saltRounds)
      return UserSchema.create(user)
        .then((newUser) => {
          logger.info(`New User ${newUser.username} created`)
          response = {
            status: true,
            error: false,
            id: newUser._id,
            message: 'created a new user'
          }
          return response
        })
        .catch((error) => {
          if (error.errmsg) {
            logger.error(`DB : ${error.errmsg}`)
            response = {
              status: false,
              error: true,
              err: error,
              message: 'error in db operation to create a new user'
            }
            return response
          }
          if (error.errors) {
            logger.error(`Validation: ${error.message}`)
            return {
              status: false,
              error: true,
              err: error
            }
          }
        })
    } catch (e) {
      console.log(e)
      logger.error('unknown error in creating a new user', e)
      return {
        status: false,
        error: true,
        err: e,
        message: 'unknown error'
      }
    }
  }

  static async deleteUser (username) {
    if (!username) {
      return {
        status: false,
        error: true,
        type: 'incomplete',
        message: 'Username required to delete user'
      }
    }

    return UserSchema.deleteOne({
      username: username
    })
      .then((resp) => {
        if (resp.deletedCount === 1) {
          return {
            status: true,
            error: false,
            message: 'user deletion successful'
          }
        }
        return {
          status: false,
          error: true,
          type: 'input mismatch',
          message: 'username not found'
        }
      })
      .catch((err) => {
        logger.error('error in deleting user')
        return {
          status: false,
          error: true,
          type: 'database',
          message: 'error deleting user',
          value: err
        }
      })
  }

  static updateUser (user) {
    return UserSchema.findByIdAndUpdate(user._id, { $set: user })
      .exec()
      .then(() => {
        return {
          status: true,
          message: 'user updation successful'
        }
      })
      .catch((err) => {
        logger.error('error')
        return {
          status: false,
          error: true,
          type: 'database',
          message: 'error updating user',
          value: err
        }
      })
  }

  static findUser (id) {
    return UserSchema.findById(id)
      .then((user) => {
        if (!user) {
          return {
            status: false,
            error: true,
            message: 'found user',
            user: user
          }
        }
        return {
          status: true,
          error: false,
          message: 'found user',
          user: user
        }
      })
      .catch((err) => {
        logger.error('error')
        return {
          status: false,
          error: true,
          type: 'database',
          message: 'error finding user',
          value: err
        }
      })
  }

  static findUserByUsername (username) {
    return UserSchema.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return {
            status: false,
            error: true,
            message: 'user not found'
          }
        }
        return {
          status: true,
          error: false,
          message: 'found user',
          user: user
        }
      })
      .catch((err) => {
        logger.error('error', err)
        return {
          status: false,
          error: true,
          type: 'database',
          message: 'error finding user',
          value: err
        }
      })
  }

  static async login (user) {
    if ((user.username || user.email) && user.password) {
      return UserSchema.findOne({
        $or: [{ username: user.username }, { email: user.email }]
      })
        .then((user1) => {
          if (!user1) {
            return {
              status: false,
              error: true,
              message: 'User not found'
            }
          } else {
            const hashRes = bcrypt.compareSync(user.password, user1.password)
            if (!hashRes) {
              return {
                status: false,
                error: true,
                message: 'Wrong password'
              }
            }
            const token = jwt.sign(
              {
                username: user1.username,
                _id: user1._id,
                allowBlog: user1.allowBlog,
                firstName: user1.firstName,
                lastName: user1.lastName,
                profilePicture: user1.profilePicture
              },
              'testsecret'
            ) // config.secret)
            return {
              status: true,
              error: false,
              message: 'Authentication successful!',
              token: token
            }
          }
        })
        .catch((err) => {
          logger.error('error', err)
          return {
            status: false,
            error: true,
            type: 'database',
            message: 'error finding user',
            value: err
          }
        })
    }
    return {
      status: false,
      error: false,
      message: 'missing username or password field'
    }
  }

  static async search (query) {
    return UserSchema.findById(query)
      .then((user) => {
        if (!user) {
          return {
            status: false,
            error: true,
            message: 'found user',
            user: user
          }
        }
        return {
          status: true,
          error: false,
          message: 'found user',
          user: user
        }
      })
      .catch((err) => {
        logger.error('error')
        return {
          status: false,
          error: true,
          type: 'database',
          message: 'error finding user',
          value: err
        }
      })
  }
}

module.exports = UserOperations
