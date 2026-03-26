const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/views/';
const port = 8000; // Defined as 8000

router.use(function (req, res, next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function (req, res) {
  res.sendFile(path + 'index.html');
});

router.get('/sharks', function (req, res) {
  res.sendFile(path + 'sharks.html');
});

app.use(express.static(path));
app.use('/', router);

// Ensure the log matches the variable
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});