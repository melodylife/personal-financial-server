var express = require('express');
var router = express.Router();
var userInfo = require('../util/db/userinfo');


/* GET home page. */
router.get('/:tableName?', function(req, res) {
  console.log('this table ' + req.params.tableName + ' get router');
  var userID = req.query.userid;
  userInfo.findUser(userID , res);
  //res.send('GET respond with a resource ' + req.params.tableName);
});

router.post('/:tableName?' , function(req , res){
  console.log('this table ' + req.params.tableName + ' post router');
  var bufDecode = new Buffer(req.body , 'base64');
  var strJson = bufDecode.toString();
  userInfo.addNewUser(strJson , res);
  //res.send(result);
});

router.delete('/:tableName?' , function(req , res){

  console.log('this table ' + req.params.tableName + ' delete router');
  res.send('DELETE respond with a resource ' + req.params.tableName);

});

router.put('/:tableName?' , function(req , res){

  console.log('this table ' + req.params.tableName + ' update router');
  res.send('PUT respond with a resource ' + req.params.tableName);

});

//Add a new user into the DB

module.exports = router;
