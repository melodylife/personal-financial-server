var express = require('express');
var router = express.Router();
var userInfo = require('../util/db/userinfo');
var finbookInfo = require('../util/db/finbook');

router.get('/login', function(req, res) {
  var userID = req.query.userid;
  var password = req.query.password;
  userInfo.login(userID , password , res);
});

router.post('/reg' , function(req , res){
  var jsonStr = req.body;
  console.log('Handle the request to add user' + jsonStr);
  userInfo.addNewUser(jsonStr , res);
});

router.get('/readuser' , function(req , res){
  var userID = req.query.userid;
  userInfo.findUser(userID , res);
});

router.get('/readfinbooklist' , function(req , res){
  var userID = req.query.userid;
  finbookInfo.listFinbookbyOwner(userID , res);
  //userInfo.findUser(userID , res);
});

module.exports = router;
