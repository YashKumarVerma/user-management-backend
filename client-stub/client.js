const fetch = require('node-fetch')
const bcrypt = require('bcrypt')
const agent = require('./agent')
const url = require('./url')

const saltRounds = 10

class UserClient {
  async signup (user) {
    const res = await fetch(url + '/signup', {
      method: 'POST',
      body: JSON.stringify({ id: user._id, user: { username: user.username, password: bcrypt.hashSync(user.password, saltRounds) } }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }
}

module.exports = UserClient
