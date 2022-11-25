import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userTest = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  // senha: secret_admin
};

// const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9LCJpYXQiOjE2NjcxNTY2NTQsImV4cCI6MTY2OTc0ODY1NH0.hHcU-nxgd-eScPrUP9gt4KQa5u-oazCbDS3uE-T_QfE';

describe('Teste de Users para login e rota de login', () => {

  beforeEach(() => {
    sinon.stub(Users, 'findOne').resolves(userTest as Users);
  });

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  });

  let chaiHttpResponse: Response;

  describe('Teste de Users para login e rota de login', () => {

    it('Quando status code 200 com login bem sucedido', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });
    
     expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('Quando o campo "email" não é informado', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal('Incorrect email or password');
    });

    it('Quando o campo "password" não é informado', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal('Incorrect email or password');
    });

    it('Quando os campos "email" e/ou "password" estão incorretos', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal('All fields must be filled');
    });

    it('Quando a role do usuário está incorreta', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login/validate')
        .send({ email: 'admin@admin.com', password: 'secret_admin', role: 'admin' });

    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal('authorization denied');
    });
  });
});
