const http = require('http');

const {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
} = require('./repo.js');

let app = http.createServer(async function (req, res) {
  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('home');
  } else if (req.url == '/todos') {
    if (req.method == 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(await getToDos(req, res));
      res.end();
    } else if (req.method == 'POST') {
      try {
        await postToDo(req, res);
        res.write('posted successfully');
        res.end();
      } catch (error) {
        res.write('400');
        console.log(error);
      }
    } else if (req.method == 'PUT') {
      try {
        await updateToDo(req, res);
        res.writeHead(200);
        res.write('updated successfully');

        res.end();
      } catch (error) {
        res.write('400');
        console.log(error);
      }
    } else if (req.method == 'DELETE') {
      try {
        await deleteToDo(req, res);
        res.writeHead(200);
        res.write('deleted successfully');

        res.end();
      } catch (error) {
        res.write('400');
        console.log(error);
        res.end();
      }
    }
  } else if (req.url.includes('/todos/status') && req.method == 'PATCH') {
    try {
      await changeToDoStatus(req, res);
      res.writeHead(200);
      res.write('status updated successfully');
      res.end();
    } catch (error) {
      res.write('400');
      console.log(error);
      res.end();
    }
  } else {
    res.write('404');
  }
  res.end();
}, console.log('server started'));

module.exports = app;

app.listen(8080);
