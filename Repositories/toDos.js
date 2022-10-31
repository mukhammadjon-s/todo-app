/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const { readFile, writeFile } = require('fs/promises')
const BaseError = require('./errorHandling')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function getToDos (headers) {
  try {
    let header = ''
    if (process.env.NODE_ENV === 'test') {
      header = headers[5]
    } else {
      header = headers[1]
    }
    const { user_id } = jwt.verify(header, process.env.TOKEN_KEY)
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString()).filter((dt) => dt.deleted !== true && dt.assignee == user_id)
    return JSON.stringify(data)
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function postToDo (body) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString())
    data.push(JSON.parse(body))
    await writeFile('./DB/todos.json', JSON.stringify(data, undefined, 2))
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function updateToDo (body, url) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString())
    data.find((d) => url[2] == d.id).text = JSON.parse(body).text
    await writeFile('./DB/todos.json', JSON.stringify(data, undefined, 2))
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function deleteToDo (url) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString())
    data.find((d) => url[2] == d.id).deleted = true
    await writeFile('./DB/todos.json', JSON.stringify(data, undefined, 2))
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function changeToDoStatus (url) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString())
    data.find((d) => url[3] == d.id).status = url[4]
    await writeFile('./DB/todos.json', JSON.stringify(data, undefined, 2))
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function assignTo (body) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString())
    data.find((d) => JSON.parse(body).task_id == d.id).assignee =
      JSON.parse(body).user_id
    await writeFile('./DB/todos.json', JSON.stringify(data, undefined, 2))
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

async function getToDosByStatus (status) {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString()).filter(
      (dt) => dt.deleted !== true && dt.status == status
    )
    return JSON.stringify(data)
  } catch (error) {
    throw new BaseError(error.message, '404', true, error.message)
  }
}

module.exports = {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
  assignTo,
  getToDosByStatus
}
