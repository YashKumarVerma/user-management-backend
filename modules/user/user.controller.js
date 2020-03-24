const logger = require('./../../logging/logger')
const UserSchema = require('./user.schema')

UserSchema.deleteMany({})
  .then(() => logger.debug('Database Cleared'))
  .catch(() => logger.debug('Error Cleaning Database'))

class UserOperations {
  createNewUser (dataObject) {
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

    return UserSchema.create(dataObject)
  }

  deleteUser (username) {
    return UserSchema.deleteOne({
      username: username
    })
  }
}

module.exports.UserOperations = new UserOperations()
