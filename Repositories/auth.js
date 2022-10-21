const { readFile, writeFile } = require('fs/promises');
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function loginUser(req, res) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(201, { 'Content-Type': 'text/html' });
  });
  let data = await readFile('users.json');
  data = JSON.parse(data.toString());

  let foundUser = data.find(
    (dt) =>
      dt.user_name == JSON.parse(body).user_name &&
      dt.user_pass == JSON.parse(body).user_pass
  );
  if (foundUser != undefined) {
    return JSON.stringify({
      token: jwt.sign(foundUser, process.env.TOKEN_KEY, {
        expiresIn: '24h',
      }),
    });
  } else {
    res.writeHead(401);
    return '401 unauthorized';
  }
}

async function verify(req) {
  try {
    let body = jwt.verify(req.rawHeaders[1], process.env.TOKEN_KEY);

    let data = await readFile('users.json');
    data = JSON.parse(data.toString());
    let foundUser = data.find(
      (dt) => dt.user_name == body.user_name && dt.user_pass == body.user_pass
    );

    if (foundUser != undefined) {
      return true;
    } else {
      false;
    }
  } catch (err) {
    console.log(err);
    return '404';
  }
}
module.exports = { loginUser, verify };

// Create login route and authenticate user. you can use jsonwebtoken to authorize user. + test

// Add new route is assignTo which assigns tasks to particular user.
