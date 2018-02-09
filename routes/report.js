var express = require('express');
var router = express.Router();
var userInfo = require('../util/db/userinfo');
var finbookInfo = require('../util/db/finbook');

router.get('/reportdata', function(req, res) {
  console.log('This is report');
  //res.end();
  var userID = req.query.userid;
  var startDate = req.query.startdate;
  var endDate = req.query.enddate;
  finbookInfo.listRecbyFinbook(userID , startDate , endDate , res)
});


module.exports = router;
