const request = require('supertest');
const app = require('../main.js');
require('dotenv').config();

describe('Test GET /todos', () => {
  test('it should respond with 200 success', async () => {
    response = await request(app)
      .get('/todos')
      .set('token', process.env.rawToken)
      .expect(200);
      console.log(response)
  });
});

describe('Test POST /todos', () => {
  test('it should respond with 201 created', async () => {
    response = await request(app)
      .post('/todos')
      // .setHeader('token', process.env.rawToken)
      .send({
        id: 8,
        text: 'text8',
        status: 'high',
      })
      .expect(201);
  });
});

describe('Test UPDATE /todos', () => {
  test('it should respond with 200 updated', async () => {
    response = await request(app)
      .put('/todos')
      // .setHeader('token', process.env.rawToken)
      .send({
        id: 8,
        text: 'text8',
      })
      .expect(200);
  });
});
describe('Test DELETE /todos', () => {
  test('it should respond with 200 deleted', async () => {
    response = await request(app)
      .delete('/todos')
      // .setHeader('token', process.env.rawToken)
      .send({
        id: 8,
      })
      .expect(200);
  });
});
describe('Test PATCH Status /todos', () => {
  test('it should respond with 200 patched status', async () => {
    response = await request(app)
      .patch('/todos')
      // .setHeader('token', process.env.rawToken)
      .send({
        id: 8,
        status: 'high',
      })
      .expect(200);
  });
});
