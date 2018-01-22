var mongoose = require('mongoose');
var schema = mongoose.Schema;
var conf = require('../../conf/serConf.json');
var util = require('../commUtils');
var md5  = require('md5');
var constants = require('../constants');

var dbConnectivityConf = 'mongodb://' + conf.DBHost + '/' + conf.DBName

mongoose.connect(dbConnectivityConf);

var userInfoSchema = new schema({
  _id: String,//use email to register user id
  acctCrDate: Date,
  nick_name: String,
  payment_method: [],
  //age: Number,
  bookPack: {type: [String] , default:["Life"]},
  password: {
    salt: String,
    hashedPwd: String
  }
});
var userInfo = mongoose.model('userInfo' , userInfoSchema);


exports.addNewUser = function(jsonStr , res){
  var userinfo = JSON.parse(jsonStr);
  
  //secure the password 
  var plainPwd = userinfo.password;
  var salt = util.ramString(plainPwd.length);
  var pwdObj = new Object();
  var pwdPayload = salt + plainPwd;
  pwdObj.salt = salt;
  pwdObj.hashedPwd = md5(pwdPayload);
  userinfo.password = pwdObj;
  var newUser = new userInfo(userinfo);
  
  util.saveTable("userinfo" , newUser , res);
}

exports.findUser = function(userID , res){
  util.findWithCondition("userInfo" , userInfo , {_id: userID} , res);
}

exports.login = function(userID, userPwd , res){
  userInfo.find({"_id": userID} , function(err , rst){
    var judRst = new Object();
    if(!err){
      if(null == rst || 0 == rst.length){
        judRst.result = constants.resStatus.FAILED;
        judRst.message = 'The user doesn\'t exist';
      }
      else if (rst.length > 1) {
        judRst.result = constants.resStatus.FAILED;
        judRst.message = 'DB error, the DB contains 2 or more identical IDs';
      }
      else{
        var salt = rst[0].password.salt;
        var hashedPwd = rst[0].password.hashedPwd
        var newHashPwd = md5(salt + userPwd);
        console.log('The pass is ' + hashedPwd);
        if(hashedPwd == newHashPwd){
          console.log('Login success');
          judRst.result = constants.resStatus.VERIFIED;
        }
        else {
          judRst.result = constants.resStatus.FAILED;
        }
      }
    }
    res.send(judRst);
    return;
  });

}
