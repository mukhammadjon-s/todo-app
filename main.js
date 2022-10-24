const http = require('http')

const {
  getToDos,
  postToDo,
  updateToDo,
  deleteToDo,
  changeToDoStatus
} = require('./repo.js')

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('home')
  } else if (req.url === '/todos') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(await getToDos())
      res.end()
    } else if (req.method === 'POST') {
      try {
        let body = ''
        req.on('data', (data) => {
          body += data
        })
        console.log(await body)
        await postToDo(body)
        res.writeHead(201, { 'Content-Type': 'text/html' })
        res.write('posted successfully')
        res.end()
      } catch (error) {
        res.write('400')
        console.log(error)
      }
    } else if (req.method === 'PUT') {
      try {
        const url = req.url.split('/')
        let body = ''
        req.on('data', (data) => {
          body += data
        })
        console.log(await body)
        await updateToDo(body, url)

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('updated successfully')

        res.end()
      } catch (error) {
        res.write('400')
        console.log(error)
      }
    } else if (req.method === 'DELETE') {
      try {
        const url = req.url.split('/')
        await deleteToDo(url)

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('deleted successfully')

        res.end()
      } catch (error) {
        res.write('400')
        console.log(error)
        res.end()
      }
    }
  } else if (req.url.includes('/todos/status') && req.method === 'PATCH') {
    try {
      const url = req.url.split('/')
      await changeToDoStatus(url)

      res.writeHead(200, { 'Content-Type': 'text/html' })

      res.write('status updated successfully')
      res.end()
    } catch (error) {
      res.write('400')
      console.log(error)
      res.end()
    }
  } else {
    res.write('404')
  }
  res.end()
}, console.log('server started'))

module.exports = app

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  )
}
