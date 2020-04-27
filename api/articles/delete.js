const model = require('./model');
const httpError = require('../../utils/httpError');

module.exports = function (route) {
  return route.delete(async function (req, res) {
    try {
      const data = await model.deleteDocument(req.params.id);

      res.json({ data: { deletedCount: data.deletedCount } });
    } catch (error) {
      httpError(res, error);
    }
  });
};
