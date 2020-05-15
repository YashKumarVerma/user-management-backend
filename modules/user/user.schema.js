const mongoose = require('mongoose')
const { UserValidator } = require('./validator.controller')

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Username Required',
      unique: true,
      lowercase: true,
      trim: true,
      validate: [UserValidator.username, 'invalid username passed']
    },

    firstName: {
      type: String,
      required: 'First name Required',
      trim: true,
      validate: [
        UserValidator.genericText,
        'only alphanumeric characters allowed in firstname'
      ]
    },

    lastName: {
      type: String,
      required: 'Last name Required',
      trim: true,
      validate: [
        UserValidator.genericText,
        'only alphanumeric characters allowed in lastname'
      ]
    },

    profilePicture: {
      type: String,
      default: 'http://via.placeholder.com/150',
      trim: true,
      validate: [
        UserValidator.link,
        'invalid url passed as profile picture link'
      ]
    },

    email: {
      type: String,
      required: 'E-Mail Address required',
      unique: true,
      lowercase: true,
      validate: [UserValidator.email, 'invalid email passed'],
      trim: true
    },

    password: {
      type: String,
      required: true,
      validate: [UserValidator.password, 'insecure password']
    },

    birthday: {
      type: Date,
      required: false,
      validate: [UserValidator.birthday, 'invalid birthday passed']
    },

    address: {
      type: String,
      trim: true
    },

    about: {
      type: String,
      trim: true,
      validate: [UserValidator.genericText, 'invalid about']
    },

    currentDesignation: {
      type: String,
      trim: true,
      validate: [UserValidator.genericText, 'invalid designation']
    },

    education: {
      type: String,
      trim: true,
      validate: [UserValidator.genericText, 'invalid education']
    },

    workExperience: {
      type: String,
      trim: true,
      validate: [UserValidator.genericText, 'invalid work experience']
    },

    skills: [
      {
        type: String,
        trim: true,
        validate: [UserValidator.genericText, 'invalid skill']
      }
    ],

    techDomains: [
      {
        type: String,
        trim: true,
        validate: [UserValidator.genericText, 'invalid tech domain']
      }
    ],

    portfolio: {
      type: String,
      trim: true,
      validate: [UserValidator.link, 'invalid portfolio link']
    },

    resume: {
      type: String,
      trim: true,
      validate: [UserValidator.link, 'invalid resume link']
    },

    linkedIn: {
      type: String,
      trim: true,
      validate: [UserValidator.link, 'invalid linkedIn profile link']
    },

    github: {
      type: String,
      trim: true,
      validate: [UserValidator.genericText, 'invalid github username']
    },

    blog: {
      type: String,
      trim: true,
      validate: [UserValidator.link, 'invalid blog link']
    },

    allowBlog: {
      type: Boolean,
      default: false
    },

    socialHandles: [
      {
        type: String,
        trim: true,
        validate: [UserValidator.link, 'invalid social link']
      }
    ]
  },
  {
    timestamps: true
  }
)

user.index({
  username: 'text',
  firstName: 'text',
  lastName: 'text'
})

module.exports = mongoose.model('User', user)
