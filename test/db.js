process.env.PORT = 4500;
process.env.NODE_ENV = 'test';

const chai = require('chai');

const createDatabaseConnection = require('../db');

chai.should();

describe('DB', () => {
  describe('Connection', () => {
    let client = undefined;
    before(async () => {
      client = await createDatabaseConnection();
    });
    it('Should be connected', () => {
      client.topology.s.state.should.include.string('connected')
    });
  });
});
