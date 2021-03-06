module.exports = function (path, context) {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var demand = require('../middleware/demand')(context);


  router.get('/', demand("fa"), function (req, res) {

    if(req.user === "") {
      console.log ("At: / User is not logged in");
      res.redirect(context.root + 'sign');
    } else {
      console.log ("At: / User is logged in");
      res.redirect(context.root +'month');
    }


  });

  /* GET home page. */
  router.get('/month', demand("fa"), function(req, res) {



    res.render('month');
  });

  router.get('/yourfreeagent/:subdomain', demand("fa"), function(req, res) {

    var url =  'https://'+req.params.subdomain;
    if(context.config.freeagent.apiUrl.indexOf('.sandbox.') > -1) {
      url += '.sandbox';
    }
    url += '.freeagent.com';

    res.redirect(url);

  });

  return router;
};
