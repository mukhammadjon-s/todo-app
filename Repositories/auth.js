const { readFile } = require('fs/promises')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const BaseError = require('./errorHandling')

async function loginUser (body) {
  let data = await readFile('./DB/users.json')
  data = JSON.parse(data.toString())

  const foundUser = data.find(
    (dt) =>
      dt.user_name === JSON.parse(body).user_name &&
    dt.user_pass === JSON.parse(body).user_pass
  )
  if (foundUser !== undefined) {
    return JSON.stringify({
      token: jwt.sign({ user_id: foundUser.user_id }, process.env.TOKEN_KEY, {
        expiresIn: '24h'
      })
    })
  } else {
    throw new BaseError(
      'unauthorized',
      '401',
      false,
      'invalid username or password'
    )
  }
}

async function verify (headers) {
  try {
    let header = ''
    if (process.env.NODE_ENV === 'test') {
      header = headers[5]
    } else {
      header = headers[1]
    }
    const body = jwt.verify(header, process.env.TOKEN_KEY)
    if (body !== undefined) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new BaseError(
      'invalid token',
      '401',
      false,
      'unauthorized'
    )
  }
}
module.exports = { loginUser, verify }
