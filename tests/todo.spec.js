const request = require('supertest');
const app = require('../main.js');

describe('Test GET /todos', () => {
  test('it should respond with 200 success', async () => {
    response = await request(app).get('/todos').expect(200);
  });
});

describe('Test POST /todos', () => {
  test('it should respond with 201 created', async () => {
    response = await request(app)
      .post('/todos')
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
      .send({
        id: 8,
        status: 'high',
      })
      .expect(200);
  });
});
