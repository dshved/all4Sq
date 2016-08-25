var express = require('express');
var router = express.Router();
var request = require("request");

function requireLogin(req, res, next) {
  if (!req.session.access_token) {
    res.redirect('/auth');
    res.end();
  } else {
    next();
  }
};

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
}

/* GET home page. */
router.get('/', requireLogin, function(req, res, next) {
  var url = 'https://api.foursquare.com/v2/users/self?oauth_token=' +
    req.session.access_token + '&v='+ today();
  request(url, function(error, response, body) {
    var json = JSON.parse(body);
    var user_id = json['response']['user']['firstName']
    res.render('index', {title: user_id});
    res.end();
  });

  // res.render('index', { title: req.session.access_token });
});

module.exports = router;
