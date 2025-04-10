import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('User API', () => {
  let userId;

  it('POST /api/users - should create a new user', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: `test${Date.now()}@mail.com` })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.include.keys('id', 'name', 'email');
        userId = res.body.id;
        done();
      });
  });

  it('GET /api/users - should return users list', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('PUT /api/users/:id - should update user', (done) => {
    chai.request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Updated User', email: `updated${Date.now()}@mail.com` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.include({ id: userId.toString() });
        done();
      });
  });

  it('DELETE /api/users/:id - should delete user', (done) => {
    chai.request(app)
      .delete(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(204);
        done();
      });
  });
});
