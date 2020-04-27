const create = require('./create');
const read = require('./read');
const update = require('./update');
const remove = require('./delete');

module.exports = function registerRoutes(router) {
  const baseRoute = router.route('/articles');
  const paramRoute = router.route('/articles/:id');

  create(baseRoute);
  read(baseRoute);
  update(paramRoute);
  remove(paramRoute);
};
