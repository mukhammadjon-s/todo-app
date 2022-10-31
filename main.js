const http = require('http')

const {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus,
  assignTo
} = require('./Repositories/toDos.js')

const BaseError = require('./Repositories/errorHandling.js')

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
      await body
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(await loginUser(body))
    } catch (error) {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(error))
    }
  } else if (req.url === '/todos') {
    if (req.method === 'GET') {
      try {
        await verify(req.rawHeaders)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(await getToDos(req.rawHeaders))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    } else if (req.method === 'POST') {
      try {
        await verify(req.rawHeaders)
        req.on('data', (data) => {
          postToDo(data)
        })
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 201: 'posted successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    }
  } else if (req.url === '/todos/assignTo') {
    if (req.method === 'PUT') {
      try {
        await verify(req.rawHeaders)
        req.on('data', function (data) {
          assignTo(data)
        })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 200: 'assigned successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    }
  } else if (req.url.includes('/todos?status=')) {
    try {
      await verify(req.rawHeaders)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(await getToDos(undefined, req.url.split('=')[1]))
    } catch (error) {
      res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(error))
    }
  } else if (req.url.includes('/todos')) {
    if (req.url === '/todos/assignTo' && req.method === 'PUT') {
      try {
        await verify(req.rawHeaders)
        req.on('data', function (data) {
          assignTo(data)
        })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 200: 'assigned successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    }
    if (req.method === 'PUT') {
      try {
        await verify(req.rawHeaders)
        const url = req.url.split('/')

        req.on('data', (data) => {
          updateToDo(data, url)
        })
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 200: 'updated successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    } else if (req.method === 'DELETE') {
      try {
        await verify(req.rawHeaders)
        const url = req.url.split('/')
        await deleteToDo(url)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 200: 'deleted successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    } else if (req.url.includes('/todos/status') && req.method === 'PATCH') {
      try {
        await verify(req.rawHeaders)
        const url = req.url.split('/')
        await changeToDoStatus(url)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 200: 'status updated successfully' }))
      } catch (error) {
        res.writeHead(error.statusCode, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(error))
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write(
        JSON.stringify(
          new BaseError('not found', '404', false, 'page not found')
        )
      )
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(
      JSON.stringify(new BaseError('not found', '404', false, 'page not found'))
    )
  }
  res.end()
}, 'server started')

module.exports = app

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT)
}
