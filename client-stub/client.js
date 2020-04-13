const fetch = require('node-fetch')
const agent = require('./agent')
const url = require('./url')

/**
 * @typedef {Object} WorkerResponse
 * @property {boolean} error true or false depending upon success of operation
 * @property {String} message a short message describing the type of error if any, or outcome
 */
/**
 * @typedef {Object} LoginResponse
 * @property {boolean} error true or false depending upon success of operation
 * @property {String} token authentication token which needs to be passed in header in requests
 * @property {String} message a short message describing the type of error if any, or outcome
 */
/**
 * @typedef {Object} AboutUserResponse
 * @property {boolean} error true or false depending upon success of operation
 * @property {String} message a short message describing the type of error if any, or outcome
 * @property {Object} user an object containing all user properties
 */

/**
 * @class
 * @classdesc: Class to manage all user related CRUD operations
 * @requires node-fetch
 */
class UserClient {
  /**
   * @description This function is used to facilitate signup, i.e. create a new user in the system.
   * @async
   *
   * @param {object} user Object containing user details
   * @param {String} user.username Unique username of the user
   * @param {String} [user.firstName] First Name of the user
   * @param {String} [user.lastName] Last Name of the user
   * @param {String} [user.profilePicture=http://via.placeholder.com/150] URL of profile picture of user
   * @param {String} user.email E-Mail of the user
   * @param {String} user.password Password of the user
   * @param {String} [user.birthday] Date of birth of user
   * @param {String} [user.address] Address of user
   * @param {String} [user.about] Short bio of about user
   * @param {String} [user.currentDesignation] Current designation of user
   * @param {String} [user.education] Short text about user's educational qualifications
   * @param {String} [user.workExperience] Short text about user's work experience
   * @param {String[]} [user.skills] Array of user's skills
   * @param {String[]} [user.techDomains] Array of names of technical domains of user
   * @param {String} [user.portfolio] URL of user's portfolio
   * @param {String} [user.resume] URL of user's resume
   * @param {String} [user.linkedIn] URL of user's linkedIn Profile
   * @param {String} [user.github] URL of user's github Profile
   * @param {String} [user.blog] URL of user's personal blog
   * @param {String[]} [user.socialHandles] Array of URLs of users various social handles
   * @returns {WorkerResponse} an object containing outcome of the operation, with status
   */
  async signup (user) {
    const res = await fetch(url + '/signup', {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  /**
   * @description This function is used to facilitate profile updates, i.e. edit user details in the system
   * @async
   * @param {object} user Object containing user details
   * @param {String} [user.firstName] First Name of the user
   * @param {String} [user.lastName] Last Name of the user
   * @param {String} [user.profilePicture=http://via.placeholder.com/150] URL of profile picture of user
   * @param {String} [user.password] Password of the user
   * @param {String} [user.birthday] Date of birth of user
   * @param {String} [user.address] Address of user
   * @param {String} [user.about] Short bio of about user
   * @param {String} [user.currentDesignation] Current designation of user
   * @param {String} [user.education] Short text about user's educational qualifications
   * @param {String} [user.workExperience] Short text about user's work experience
   * @param {String[]} [user.skills] Array of user's skills
   * @param {String[]} [user.techDomains] Array of names of technical domains of user
   * @param {String} [user.portfolio] URL of user's portfolio
   * @param {String} [user.resume] URL of user's resume
   * @param {String} [user.linkedIn] URL of user's linkedIn Profile
   * @param {String} [user.github] URL of user's github Profile
   * @param {String} [user.blog] URL of user's personal blog
   * @param {String[]} [user.socialHandles] Array of URLs of users various social handles
   * @returns {WorkerResponse} an object containing outcome of the operation, with status
   */
  async update (user, token) {
    const res = await fetch(url + '/update', {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  /**
   * @description This function is used to facilitate login, i.e. generate auth tokens for user
   * @async
   * @param {object} user Object containing user details
   * @param {String} user.username Username of user to log in. Either username, or email is required
   * @param {String} user.email E-Mail of user to log in. Either username, or email is required
   * @param {String} user.password Password of the user
   * @returns {LoginResponse} an object containing outcome of the operation
   */
  async login (user) {
    const res = await fetch(url + '/login', {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  /**
   * @description This function is used to facilitate account deletion, i.e. remove a user from the system
   * @async
   * @param {object} user Object containing user details
   * @param {String} user.username Username of user to delete.
   * @returns {WorkerResponse} an object containing outcome of the operation
   */
  async delete (user) {
    const res = await fetch(url + '/delete', {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  /**
   * @description This function is used to facilitate user information, i.e. return details for profile pages
   * @async
   * @param {String} username Username of the user whose information is required.
   * @returns {AboutUserResponse} an object containing outcome of the operation
   */
  async aboutUser (username) {
    const res = await fetch(url + `/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  /**
   * @description This function is used to facilitate user information, from an internal database id
   * @async
   * @param {String} userid unique if of the user as stored in database
   * @returns {AboutUserResponse} an object containing outcome of the operation
   */

  async details (user) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }
}

module.exports = UserClient
