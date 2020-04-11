const fetch = require('node-fetch')
const agent = require('./agent')
const url = require('./url')

class UserClient {
  async signup (user, bcryptPwd) {
    const res = await fetch(url + '/signup', {
      method: 'POST',
      body: JSON.stringify({ newuser: { id: user._id, username: user.username, email: user.email, password: bcryptPwd } }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  async update (user, token) {
    const res = await fetch(url + '/update', {
      method: 'POST',
      body: JSON.stringify({ newuser: { userobj: user } }),
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  async login (user, hashres) {
    const res = await fetch(url + '/login', {
      method: 'POST',
      body: JSON.stringify({ auth: { id: user._id, email: user.email, username: user.username, hash: hashres } }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }
}

module.exports = UserClient
