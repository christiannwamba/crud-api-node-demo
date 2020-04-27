const ObjectID = require('mongodb').ObjectID;

const config = require('../../utils/config');
const createDatabaseConnection = require('../../db');

async function insertDocument(payload) {
  const client = await createDatabaseConnection();
  const db = client.db(config.database.name);

  return await db.collection('articles').insertOne(payload);
}

async function fetchAllDocuments() {
  const client = await createDatabaseConnection();
  const db = client.db(config.database.name);
  return await db.collection('articles').find({}).toArray();
}

async function updateDocument(payload, id) {
  const client = await createDatabaseConnection();
  const db = client.db(config.database.name);

  return await db
    .collection('articles')
    .updateOne({ _id: ObjectID(id) }, { $set: payload });
}

async function deleteDocument(id) {
  const client = await createDatabaseConnection();
  const db = client.db(config.database.name);
  return await db.collection('articles').deleteOne({ _id: ObjectID(id) });
}

module.exports = {
  insertDocument,
  fetchAllDocuments,
  updateDocument,
  deleteDocument
};