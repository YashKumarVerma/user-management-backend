const validator = require('validator')

class UserValidator {
  // function to put validations on username
  username (username) {
    return (
      validator.isAlphanumeric(username) &&
      validator.isLength(username, { min: 4, max: 20 })
    )
  }

  //   function to put validation front and last name
  name (name) {
    return (
      validator.isAlphanumeric(name) &&
      validator.isLength(name, { min: 1, max: 50 })
    )
  }

  email (email) {
    return validator.isEmail(email)
  }

  // function to validate profile url
  link (url) {
    return validator.isURL(url)
  }

  // function to validate password
  password (password) {
    return true
  }

  //   function to validate birthday
  birthday (date) {
    return (
      validator.isAfter(Date('01-01-2000')) &&
      validator.ifBefore(Date('01-01-2010'))
    )
  }

  //   function to validate generic text fields
  genericText (text) {
    return true
  }
}

module.exports.UserValidator = new UserValidator()
