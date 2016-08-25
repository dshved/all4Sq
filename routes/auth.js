var express = require('express');
var router = express.Router();
var url = require('url');
var request = require('request');
var CONFIG = require('../config');

var CLIENT_ID = CONFIG.CLIENT_ID;
var CLIENT_SECRET = CONFIG.CLIENT_SECRET;
var REDIRECT_URI = CONFIG.REDIRECT_URI;

var GET_CODE_URL = 'https://foursquare.com/oauth2/authenticate' +
  '?client_id=' + CLIENT_ID +
  '&response_type=code' +
  '&redirect_uri=' + REDIRECT_URI;

var CODE;

router.get('/', function(req, res, next) {
  res.redirect(GET_CODE_URL);
});

router.get('/callback', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  CODE = query['code'];
  if (CODE) {
    res.redirect('/auth/callback/code');
    res.end();
  } else {
    res.send();
    res.end();
  };
});

router.get('/callback/code', function(req, res, next) {
  var REQUEST = 'https://foursquare.com/oauth2/access_token' +
    '?client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&grant_type=authorization_code' +
    '&redirect_uri=' + REDIRECT_URI +
    '&code=' + CODE;
  request(REQUEST, function(error, response, body) {
    var json = JSON.parse(body);
    var token = json['access_token'];
    req.session.access_token = token;
    res.redirect('/');
    res.end();
  });
});

module.exports = router;
