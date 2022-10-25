/* eslint-disable eqeqeq */
const { readFile, writeFile } = require('fs/promises')

async function getToDos () {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString()).filter((dt) => dt.deleted !== true)
  return JSON.stringify(data)
}

async function postToDo (body) {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString())
  data.push(JSON.parse(body))
  await writeFile('./DB/todos.json', JSON.stringify(data))
}

async function updateToDo (body, url) {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString())
  data.find((d) => url[2] == d.id).text = JSON.parse(body).text
  await writeFile('./DB/todos.json', JSON.stringify(data))
}

async function deleteToDo (url) {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString())
  data.find((d) => url[2] == d.id).deleted = true
  await writeFile('./DB/todos.json', JSON.stringify(data))
}

async function changeToDoStatus (url) {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString())
  data.find((d) => url[3] == d.id).status = url[4]
  await writeFile('./DB/todos.json', JSON.stringify(data))
}

async function assignTo (body) {
  let data = await readFile('./DB/todos.json')
  data = JSON.parse(data.toString())
  data.find((d) => JSON.parse(body).task_id == d.id).assignee = JSON.parse(body).user_id
  await writeFile('./DB/todos.json', JSON.stringify(data))
}

module.exports = {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
  assignTo
}
