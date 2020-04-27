const model = require('./model');
const httpError = require('../../utils/httpError');

module.exports = function (route) {
  return route.put(async function (req, res) {
    try {
      const data = await model.updateDocument(req.body, req.params.id);

      res.json({ data: { modifiedCount: data.modifiedCount } });
    } catch (error) {
      httpError(res, error);
    }
  });
};
