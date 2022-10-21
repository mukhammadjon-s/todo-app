const { readFile, writeFile } = require('fs/promises');
var url = require('url');

async function getToDos() {
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString()).filter((dt) => dt.deleted != true);
  return JSON.stringify(data);
}

async function postToDo(req, res) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(201, { 'Content-Type': 'text/html' });
  });
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.push(JSON.parse(body));
  await writeFile('todos.json', JSON.stringify(data));
}

async function updateToDo(req, res) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(201, { 'Content-Type': 'text/html' });
  });
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => JSON.parse(body).id == d.id).text = JSON.parse(body).text;
  await writeFile('todos.json', JSON.stringify(data));
}

async function deleteToDo(req, res) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(201, { 'Content-Type': 'text/html' });
  });
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => JSON.parse(body).id == d.id).deleted = true;
  await writeFile('todos.json', JSON.stringify(data));
}

async function changeToDoStatus(req, res) {
  let a =  req.url.split('/')
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(201, { 'Content-Type': 'text/html' });
  });
  let data = await readFile('todos.json');
  data = JSON.parse(data.toString());
  data.find((d) => a[3] == d.id).status = a[4];

  await writeFile('todos.json', JSON.stringify(data));
}

module.exports = {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
};
