var express = require('express');
var router = express.Router();
var userInfo = require('../util/db/userinfo');

router.get('/login', function(req, res) {
  var userID = req.query.userid;
  var password = req.query.password;
  userInfo.login(userID , password , res);
});

module.exports = router;
