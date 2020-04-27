const model = require('./model');
const httpError = require('../../utils/httpError');

module.exports = function (route) {
  return route.post(async function (req, res) {
    try {
      const data = await model.insertDocument(req.body);
    
      res.json({ data: { insertedId: data.insertedId } });
    } catch (error) {
      httpError(res, error);
    }
  });
};