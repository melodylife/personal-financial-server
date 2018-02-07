var express = require('express');
var router = express.Router();
var userInfo = require('../util/db/userinfo');
var finbookInfo = require('../util/db/finbook');

router.post('/reportdata', function(req, res) {
  console.log('This is report');
  res.end();
});


module.exports = router;
