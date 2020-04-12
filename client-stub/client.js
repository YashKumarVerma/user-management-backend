const fetch = require('node-fetch')
const agent = require('./agent')
const url = require('./url')

class UserClient {
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

  async delete (user, token) {
    const res = await fetch(url + '/delete/', {
      method: 'POST',
      body: JSON.stringify({ user: user }),
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  async details (user) {
    const res = await fetch(url + `/${user}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }

  async findUser (user) {
    const res = await fetch(url, {
      method: 'GET',
      body: JSON.stringify({ user: user }),
      headers: { 'Content-Type': 'application/json' },
      agent
    })
    const body = await res.json()
    return body
  }
}

module.exports = UserClient
