const model = require('./model');
const httpError = require('../../utils/httpError');

module.exports = function (route) {
  return route.get(async function (_, res) {
    try {
      const data = await model.fetchAllDocuments();
      res.json({ data });
    } catch (error) {
      httpError(res, error);
    }
  });
};