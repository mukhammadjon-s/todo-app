/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../main.js')
require('dotenv').config()

describe('Test GET /todos/assignTo', () => {
  test('it should respond with 200 success', async () => {
    response = await request(app)
      .get('/todos/assignTo')
      .set('token', process.env.rawToken)
      .expect(200)
  })
})

describe('Test POST /todos/assignTo', () => {
  test('it should respond with 201 created', async () => {
    response = await request(app)
      .post('/todos/assignTo')
      .set({ token: process.env.rawToken })
      .send({
        id: 3,
        user_id: 5,
        task_id: 2
      })
      .expect(201)
  })
})
