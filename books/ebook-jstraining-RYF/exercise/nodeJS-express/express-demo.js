// test 1
var express = require('express');
var app = express();
var router = express.Router();
router.get('/', function(req, res) {
  res.send('<p>Hello Express</p>');
  console.log(res, req);
});
app.use('./home', router);
app.use('./index', router);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('open port localhost:' + port);

// test 2
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
var port = 8088;
var router = express.Router();

router.use((req, res, next) => {
  console.log('this is a next interval');
  next();
});

router.get('/', (req, res) => {
  console.log(req.query);
  res.send('<p></p>');
});

router.get('/:name', (req, res) => {
  res.send('<span></span>');
});

router.post('/', (req, res) => {
  let name = req.body.name;
  res.json({ message: 'Hello' + name });
});

app.use('./home', router);
app.listen(port);