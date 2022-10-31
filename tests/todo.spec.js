/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../main.js')

describe('Test Auth POST /login', () => {
  test('it should respond with 200 success', async () => {
    response = await request(app)
      .post('/login')
      .send({
        user_name: 'maryam',
        user_pass: '12345'
      })
      .expect(200)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .post('/login')
      .send({
        user_name: 'safia',
        user_pass: '12345'
      })
      .expect(401)
  })
})

describe('Test GET /todos', () => {
  test('it should respond with 200 success', async () => {
    response = await request(app)
      .get('/todos')
      .set({ token: process.env.rawToken })
      .expect(200)
  })
  test('it should respond with 200 success', async () => {
    response = await request(app)
      .get('/todos?status=DONE')
      .set({ token: process.env.rawToken })
    expect(JSON.parse(response.text).length).toEqual(1)
  })
})

describe('Test POST /todos', () => {
  test('it should respond with 201 created', async () => {
    response = await request(app)
      .post('/todos')
      .set({ token: process.env.rawToken })
      .send({
        id: 8,
        text: 'text8',
        status: 'DOING'
      })
      .expect(201)
  })

  test('it should respond with 404 error', async () => {
    response = await request(app)
      .post('/todos')
      .set({ token: process.env.rawToken })
      .send({
        id: 8,
        status: 'DOING'
      })
      .expect(404)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .post('/todos')
      .set({ token: process.env.rawTokenWrong })
      .send({
        id: 8,
        text: 'text8',
        status: 'DOING'
      })
      .expect(401)
  })
})

describe('Test UPDATE /todos/:id', () => {
  test('it should respond with 200 updated', async () => {
    response = await request(app)
      .put('/todos/3')
      .set({ token: process.env.rawToken })
      .send({
        text: 'text33'
      })
      .expect(200)
  })

  test('it should respond with 404 error', async () => {
    response = await request(app)
      .put('/todos/100')
      .set({ token: process.env.rawToken })
      .send({
        text: 'text33'
      })
      .expect(404)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .put('/todos/3')
      .set({ token: process.env.rawTokenWrong })
      .send({
        text: 'text33'
      })
      .expect(401)
  })
})

describe('Test DELETE /todos/:id', () => {
  test('it should respond with 200 deleted', async () => {
    response = await request(app)
      .delete('/todos/1')
      .set('token', process.env.rawToken)
      .expect(200)
  })

  test('it should respond with 404 error', async () => {
    response = await request(app)
      .delete('/todos/100')
      .set({ token: process.env.rawToken })
      .expect(404)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .delete('/todos/1')
      .set('token', process.env.rawTokenWrong)
      .expect(401)
  })
})

describe('Test PATCH Status /todos/status/:id/:status', () => {
  test('it should respond with 200 patched status', async () => {
    response = await request(app)
      .patch('/todos/status/3/DOING')
      .set({ token: process.env.rawToken })
      .expect(200)
  })

  test('it should respond with 404 error', async () => {
    response = await request(app)
      .patch('/todos/status/100/DOING')
      .set({ token: process.env.rawToken })
      .expect(404)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .patch('/todos/status/3/DOING')
      .set({ token: process.env.rawTokenWrong })
      .expect(401)
  })
})

describe('Test SET /todos/assignTo', () => {
  test('it should respond with 200 updated', async () => {
    response = await request(app)
      .put('/todos/assignTo')
      .set({ token: process.env.rawToken })
      .send({
        task_id: 1,
        user_id: 2
      })
      .expect(200)
  })

  test('it should respond with 404 error', async () => {
    response = await request(app)
      .put('/todos/assignTo')
      .set({ token: process.env.rawToken })
      .send({
        task_id: 10,
        user_id: 2
      })
      .expect(404)
  })

  test('it should respond with 401 invalid token', async () => {
    response = await request(app)
      .put('/todos/assignTo')
      .set({ token: process.env.rawTokenWrong })
      .send({
        task_id: 10,
        user_id: 2
      })
      .expect(401)
  })
})
