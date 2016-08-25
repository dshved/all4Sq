var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');

router.get('/', function(req, res, next) {
  res.status(200);
  res.send('ok');
  res.end();
});

router.get('/venues/search', function(req, res, next) {
  var ll = req.query['ll'];
  var url = 'https://api.foursquare.com/v2/venues/search?ll='+ ll + 
  '&oauth_token=' +req.session.access_token +
  '&v=20160825';

  request(url, function(error, response, body) {
    var json = JSON.parse(body);
    res.send(json);
    res.end();
  });
  // res.end();

});

module.exports = router;
