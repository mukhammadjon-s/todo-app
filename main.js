const http = require('http');
const {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
} = require('./Repositories/toDos.js');

const { loginUser, verify } = require('./Repositories/auth.js');

let app = http.createServer(async function (req, res) {
  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('home');
  } else if (req.url == '/login' && req.method == 'POST') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(await loginUser(req, res));
      res.end();
    } catch (error) {
      res.writeHead(401);
      res.write('401 unauthorized');
      console.log(error);
    }
  } else if (req.url == '/todos') {
    
    if (req.method == 'GET') {
      console.log(req.rawHeaders[1]);
      if(await verify(req) == true){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(await getToDos(req, res));
        res.end();
      }
      else {
        res.writeHead(401);
        res.write('401 unauthorized');
      }
      
    } else if (req.method == 'POST') {
      if (await verify(req, res) == true) {
        try {
          await postToDo(req, res);
          res.write('posted successfully');
          res.end();
        } catch (error) {
          res.write('400');
          console.log(error);
        }
      } else {
        res.writeHead(401);
        res.write('401 unauthorized');
      }
      
    } else if (req.method == 'PUT') {
      
      if (await verify(req, res) == true) {
        try {
          await updateToDo(req, res);
          res.writeHead(200);
          res.write('updated successfully');

          res.end();
        } catch (error) {
          res.write('400');
          console.log(error);
        }
      } else {
        res.writeHead(401);
        res.write('401 unauthorized');
      }
      
    } else if (req.method == 'DELETE') {
      if (await verify(req, res) == true) {
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
      } else {
        res.writeHead(401);
        res.write('401 unauthorized');
      }
      
    }
  } else if (req.url.includes('/todos/status') && req.method == 'PATCH') {
    if (await verify(req, res) == true) {
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
      res.writeHead(401);
      res.write('401 unauthorized');
    }
    
  } else {
    res.write('404');
  }
  res.end();
}, console.log('server started'));

module.exports = app;

app.listen(8080);
