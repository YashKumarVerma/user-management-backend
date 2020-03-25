const logger = require('./../../logging/logger')
const UserSchema = require('./user.schema')
const bcrypt = require('bcrypt')

const saltRounds = 10

UserSchema.deleteMany({})
  .then(() => logger.debug('Database Cleared'))
  .catch(() => logger.debug('Error Cleaning Database'))

class UserOperations {
  createNewUser (req, res) {
    // // list of all the fields which are required to register a new user
    // const requiredFields = [
    //   "username",
    //   "firstName",
    //   "lastName",
    //   "email",
    //   "password"
    // ];

    // list of all valid fields which database accepts
    // const acceptedFields = [
    //   "username",
    //   "firstName",
    //   "lastName",
    //   "email",
    //   "profilePicture",
    //   "password",
    //   "birthday",
    //   "address",
    //   "about",
    //   "currentDesignation",
    //   "education",
    //   "workExperience",
    //   "skills",
    //   "techDomains",
    //   "portfolio",
    //   "resume",
    //   "linkedIn",
    //   "github",
    //   "blog",
    //   "socialHandles"
    // ];

    // // Check if all required data provided by client request
    // for (const prop of requiredFields) {
    //   // if any field not provided, then throw error
    //   if (!dataObject[prop]) {
    //     throw `Insufficient Data supplied by client : ${prop} missing`;
    //   }
    // }

    // check if passed fields have valid data as per database schema
    // for (const prop in dataObject) {
    //   // if prop not in valid props list, throw error
    //   if (!acceptedFields.includes(prop)) {
    //     throw "Random Data supplied by client";
    //   }
    // }

    // now since we are sure that the required data fields are passed, insert them via mongoose
    // const user = new UserSchema(dataObject);
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) {
        logger.log(err.errmsg)
      }
      UserSchema.create({
        name: req.body.username,
        email: req.body.email,
        password: hash
      }).then((newUser) => {
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

  deleteUser (req, res) {
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
        console.log('error')
        return res.json({
          error: true,
          type: 'database',
          message: 'error deleting user',
          value: err
        })
      })
  }
}

module.exports.UserOperations = new UserOperations()
