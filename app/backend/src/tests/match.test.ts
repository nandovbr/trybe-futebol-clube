import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import app from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matchTest = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]

const idMatchTest = {
  "id": 5,
  "teamName": "Cruzeiro"
};

// const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9LCJpYXQiOjE2NjcxNTY2NTQsImV4cCI6MTY2OTc0ODY1NH0.hHcU-nxgd-eScPrUP9gt4KQa5u-oazCbDS3uE-T_QfE';

describe('Teste Matches', () => {

  beforeEach(() => {
    sinon.stub(Matches, 'findAll').resolves(matchTest as any);
  });

  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });

  let chaiHttpResponse: Response;

  describe('Teste Matches', () => {

    it('Quando status code 200 e lista todas as partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
    
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.equal(matchTest);
    });

    it('Quando status code 200 e lista uma das partidas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches/5')
    
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.be.equal(idMatchTest);
    });

    it('Quando status code 200 com inProgreess false', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .query({ inProgress: false })
    
        expect(chaiHttpResponse.status).to.equal(200);
    });
  });
});