const { readFile, writeFile } = require('fs/promises');

async function getToDos() {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString()).filter((dt) => dt.deleted != true);
  return JSON.stringify(data);
}

async function postToDo(body) {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.push(JSON.parse(body));
  await writeFile('todos.json', JSON.stringify(data));
}

async function updateToDo(body, url) {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => url[2] == d.id).text = JSON.parse(body).text;
  await writeFile('todos.json', JSON.stringify(data));
}

async function deleteToDo(url) {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => url[2] == d.id).deleted = true;
  await writeFile('todos.json', JSON.stringify(data));
}

async function changeToDoStatus(url) {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => url[3] == d.id).status = url[4];
  await writeFile('todos.json', JSON.stringify(data));
}

module.exports = {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
};
