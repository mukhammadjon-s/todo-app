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
        status: 'DOING',
      })
      .expect(201);
  });
});

describe('Test UPDATE /todos/:id', () => {
  test('it should respond with 200 updated', async () => {
    response = await request(app)
      .put('/todos/3')
      .send({
        text: 'text33',
      })
      .expect(200);
  });
});

describe('Test DELETE /todos/:id', () => {
  test('it should respond with 200 deleted', async () => {
    response = await request(app)
      .delete('/todos/5')
      .expect(200);
  });
});
describe('Test PATCH Status /todos/status/:id', () => {
  test('it should respond with 200 patched status', async () => {
    response = await request(app)
      .patch('/todos/status/3')
      .send({
        status: 'DONE',
      })
      .expect(200);
  });
});
