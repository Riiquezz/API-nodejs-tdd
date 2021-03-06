const request = require('supertest');
const app = require('../../src/app');

test('Deve criar usuário via signup', () => {
  return request(app)
    .post('/auth/signup')
    .send({
      name: 'User 1234',
      email: `${Date.now()}@gmail.com`,
      password: '123456',
    })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('User 1234');
      expect(res.body).not.toHaveProperty('password');
    });
});

test('Deve receber token ao logar', () => {
  const email = `${Date.now()}@gmail.com`;
  return app.services.user
    .save({ name: 'User', email, password: '123456' })
    .then(() =>
      request(app)
        .post('/auth/signin')
        .send({ email, password: '123456' })
    )
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Não deve autenticar usuário com senha errada', () => {
  const email = `${Date.now()}@gmail.com`;
  return app.services.user
    .save({ name: 'User', email, password: '123456' })
    .then(() =>
      request(app)
        .post('/auth/signin')
        .send({ email, password: '1234567' })
    )
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha errados');
    });
});

test('Não deve autenticar usuário não cadastrado', () => {
  return request(app)
    .post('/auth/signin')
    .send({ email: 'dsadas@dsadas.com', password: '1234567' })
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha errados');
    });
});

test('Não deve acessar uma rota protegida sem token', () => {
  return request(app)
    .get('/v1/users')
    .then(res => {
      expect(res.status).toBe(401);
    });
});
