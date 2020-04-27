// NPM MODULES
// import the packages we need
const express = require('express'); // express for routing
const bodyParser = require('body-parser');

const registerArticleRoutes = require('./api/articles');

// CONFIGURE APP
const app = express();

// ROUTER

const router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000; // set our port

// BASIC ROUTING

app.get('/', function (_, res) {
  res.send('Welcome to our API');
});

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router
  .route('/ping')
  .post(function (req, res) {
    res.send('You POST a PING');
  })
  .get(function (req, res) {
    res.send('You GET a PING');
  });

registerArticleRoutes(router);

app.use('/api', router);

// START THE SERVER
// =============================================================================

if(!module.parent){ 
  // Only listen when started directly
  // Without this check, mocha re-listens in watch mode when changes are made
  // This means that it will throw EADDRINUSE err because it is using the port already
  // Learn more http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
  app.listen(port);
  console.log('Magic happens on port ' + port);
 }

 // EXPORT APP
 // Export app for test
module.exports = app;