const http = require('http')

const {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
  assignTo
} = require('./Repositories/toDos.js')

const { loginUser, verify } = require('./Repositories/auth.js')

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write('home')
  } else if (req.url === '/login' && req.method === 'POST') {
    try {
      let body = ''
      req.on('data', function (data) {
        body += data
      })
      console.log(await body)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(await loginUser(body))
    } catch (error) {
      res.writeHead(401)
      res.write(`${error.message}`)
      console.log(error)
    }
  } else if (req.url === '/todos') {
    if (req.method === 'GET') {
      if ((await verify(req.rawHeaders)) === true) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(await getToDos())
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    } else if (req.method === 'POST') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          req.on('data', (data) => {
            postToDo(data)
          })
          res.writeHead(201, { 'Content-Type': 'application/json' })

          res.write(JSON.stringify({ 201: 'posted successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    }
  } else if (req.url === '/todos/assignTo') {
    if (req.method === 'PUT') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          req.on('data', function (data) {
            assignTo(data)
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({ 200: 'assigned successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    }
  } else if (req.url.includes('/todos')) {
    if (req.url === '/todos/assignTo' && req.method === 'PUT') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          req.on('data', function (data) {
            assignTo(data)
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({ 200: 'assigned successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    }
    if (req.method === 'PUT') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          const url = req.url.split('/')

          req.on('data', (data) => {
            updateToDo(data, url)
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({ 200: 'updated successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    } else if (req.method === 'DELETE') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          const url = req.url.split('/')
          await deleteToDo(url)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({ 200: 'deleted successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
          res.end()
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    } else if (req.url.includes('/todos/status') && req.method === 'PATCH') {
      if ((await verify(req.rawHeaders)) === true) {
        try {
          const url = req.url.split('/')
          await changeToDoStatus(url)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.write(JSON.stringify({ 200: 'status updated successfully' }))
        } catch (error) {
          res.write(JSON.stringify({ message: error.message }))
          console.log(error)
          res.end()
        }
      } else {
        res.writeHead(401)
        res.write(JSON.stringify({ 401: 'unauthorized' }))
      }
    } else {
      res.write(JSON.stringify({ 404: 'not found' }))
    }
  } else {
    res.write(JSON.stringify({ 404: 'not found' }))
  }
  res.end()
}, console.log('server started'))

module.exports = app

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  )
}
