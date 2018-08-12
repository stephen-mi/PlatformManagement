/* jshint node: true */
"use strict";
var jsonServer = require('json-server');
var jetpack = require('fs-jetpack');
var ip = require('ip');
var _ = require('lodash');
var path = require('path');
var fetc = require('isomorphic-fetch')

var MOCK_SERVER_PORT = 3001;
var server = jsonServer.create();

var watchFiles = {};
var jsonFiles = jetpack.cwd('./mock/json').find({ matching: '**/*.json'});


jsonFiles.forEach(function (path) {
  var code =  path.split('.')[0];

  watchFiles[code] = require('./json/'+ path);
});
var router = jsonServer.router(watchFiles);

router.render = function(req, res) {
  if (_.isEmpty(res.locals.data) && req.query.formcode && req.query.method === 'submit') {
    res.jsonp({
      result: 1
    });
  } else {
    res.jsonp(res.locals.data);
  }
};
//
var middleware = jsonServer.defaults();
//
server.use(middleware);

server.use(function (req, res, next) {
  if (req.method === 'POST') {
    var mockAddress = 'http://' + ip.address() + ':' + MOCK_SERVER_PORT;
    var fullPath = mockAddress + req.originalUrl;
    fetch(fullPath, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(function (reponse) {
      return reponse.json();
    }, function () {
      console.log("mock server redirect reject");
    }).then(function(json){
      res.jsonp(json);
    }).catch(function(err){
      console.err("mock server err");
      console.err(err);
    });
  } else {
    next();
  }
});
//
server.use(router);
server.listen(MOCK_SERVER_PORT);
