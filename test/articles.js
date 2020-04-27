process.env.PORT = 4500;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');
const seed = require('../utils/seed');
const flush = require('../utils/flush');
const model = require('../api/articles/model');

chai.should();
chai.use(chaiHttp);

// describe.skip() to skip
describe('Articles', () => {
  before(() => {
    // Either return a promise or call done(). 
    // seed() returns a promise
    return seed({ test: true });
  });

  after(flush);

  const base = '/api/';
  const payload = {
    category: 'COMEDY',
    headline:
      "'SNL' Cast Member Claims Trump Faked A Bizarre Phone Call During Rehearsals",
    authors: 'Ed Mazza',
    link:
      'https://www.huffingtonpost.com/entry/pete-davidson-trump-phone-call_us_5afd1dbae4b06a3fb50d9095',
    short_description:
      "Pete Davidson said the future president answered a phone that didn't ring.",
    date: '2018-05-17',
  };

  describe('GET /articles', () => {
    let res = undefined;
    before(async () => {
      res = await chai.request(server).get(base + 'articles');
    });

    it('Should get all articles', () => {
      res.should.have.status(200);
    });
    it('Should have a data object that is an array', () => {
      res.body.data.should.be.a('array');
    });
    it('Should have a response data of length greater than 0', () => {
      res.body.data.length.should.be.above(0);
    });
  });

  describe('POST /articles', () => {
    let res = undefined;
    before(async () => {
      res = await chai
        .request(server)
        .post(base + 'articles')
        .set('Content-Type', 'application/json')
        .send({ ...payload });
    });

    it('Should post an article', () => {
      res.should.have.status(200);
    });
    it('Should have insertedId', () => {
      res.body.data.should.have.property('insertedId');
    });
  });

  describe('PUT /articles/:id', () => {
    let res = undefined;
    before(async () => {
      const article = await model.insertDocument({ ...payload });

      res = await chai
        .request(server)
        .put(base + `articles/${article.insertedId}`)
        .set('Content-Type', 'application/json')
        .send({ ...payload, category: 'FUNNY' });
    });

    it('Should update an article', () => {
      res.should.have.status(200);
    });
    it('Should have modified count greater than 0', () => {
      res.body.data.modifiedCount.should.be.above(0);
    });
  });

  describe('DELETE /articles/:id', () => {
    let res;
    before(async () => {
      const article = await model.insertDocument({ ...payload });
      res = await chai
        .request(server)
        .delete(base + `articles/${article.insertedId}`)
        .set('Content-Type', 'application/json');
    });

    it('Should delete an article', () => {
      res.should.have.status(200);
    });
    it('Should have deleted count greater than 0', () => {
      res.body.data.deletedCount.should.be.above(0);
    });
  });
});
