const { readFile } = require('fs/promises')
require('dotenv').config()
const jwt = require('jsonwebtoken')

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
      token: jwt.sign(foundUser, process.env.TOKEN_KEY, {
        expiresIn: '24h'
      })
    })
  } else {
    return '401 unauthorized'
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
    let data = await readFile('./DB/users.json')
    data = JSON.parse(data.toString())
    const foundUser = data.find(
      (dt) => dt.user_name === body.user_name && dt.user_pass === body.user_pass
    )

    if (foundUser !== undefined) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(err)
    return '404'
  }
}
module.exports = { loginUser, verify }
