var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.status(200);
  res.send('ok');
  res.end();

});

module.exports = router;
