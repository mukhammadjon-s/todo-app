/* eslint-disable eqeqeq */
const { readFile, writeFile } = require('fs/promises')
const BaseError = require('./errorHandling')

async function getToDos () {
  try {
    let data = await readFile('./DB/todos.json')
    data = JSON.parse(data.toString()).filter((dt) => dt.deleted !== true)
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

module.exports = {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
  assignTo
}
