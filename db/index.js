const MongoClient = require('mongodb').MongoClient;

const config = require('../utils/config');

function createDatabaseClient(url) {
  return new MongoClient(url, { useUnifiedTopology: true });
}

async function createDatabaseConnection() {
  const client = createDatabaseClient(config.database.connectionString);
  try {
    const clientConnection = await client.connect();
    return clientConnection;
  } catch (error) {
    throw error;
  }
}

module.exports = createDatabaseConnection;