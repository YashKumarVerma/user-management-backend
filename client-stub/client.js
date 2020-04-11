const fetch = require('node-fetch')
const bcrypt = require('bcrypt')
const agent = require('./agent')
const url = require('./url')

const saltRounds = 10

class UserClient {
  async signup (user) {
    const res = await fetch(url + '/signup', {
      method: 'POST',
      body: JSON.stringify({ newuser: { id: user._id, username: user.username, password: bcrypt.hashSync(user.password, saltRounds) } }),
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
}

module.exports = UserClient
