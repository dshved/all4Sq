var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');

function today() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + mm + dd;
  return today;
};

router.get('/', function(req, res, next) {
  res.status(200);
  res.send('ok');
  res.end();
});

router.get('/venues/search', function(req, res, next) {
  var ll = req.query['ll'];
  var url = 'https://api.foursquare.com/v2/venues/search?ll=' + ll +
    '&oauth_token=' + req.session.access_token +
    '&v=' + today();

  request(url, function(error, response, body) {
    var json = JSON.parse(body);
    res.send(json);
    res.end();
  });
});

router.post('/checkins/add', function(req, res, next) {
  var venues_id = req.body['venues_id'];
  if (venues_id) {
    request.post({
      headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      url: 'https://api.foursquare.com/v2/checkins/add?' +
        '&oauth_token=' + req.session.access_token +
        '&v=' + today() + '&broadcast=public',
      body: "venueId=" + venues_id
    }, function(error, response, body) {
      res.send(body);
      res.end();
    })
  } else {
    res.send('not id venues');
    res.end();
  }

})

module.exports = router;
