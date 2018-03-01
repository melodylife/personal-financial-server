var mongoose = require('mongoose');
var schema = mongoose.Schema;
var conf = require('../../conf/serConf.json');
var util = require('../commUtils');
var md5  = require('md5');
var constants = require('../constants');
var moment = require('moment');

var dbConnectivityConf = 'mongodb://' + conf.DBHost + '/' + conf.DBName;
var objectId = schema.Types.ObjectId;
var mixedType = schema.Types.Mixed;

var finBookHeaderSchema = new schema({
  finBookId: objectId,
  finBookName: String,
  ownerID: String,
  createDate: Date,
  bookPack: String
});

var finBookBodySchema = new schema({
  recID: objectId,
  createDate: {type: Date , default:Date.now},
  finbookId: schema.Types.ObjectId,
  whatfor: String,
  payment: {
    amount: Number,
    currency: {type: String , default: "CNY"},
    loc: String,
    pay_method: String
  }
});

var finHeader = mongoose.model('finBookHeader' , finBookHeaderSchema);

exports.createNewFinBook = function(jsonStr , res){
  var finBookInfo = JSON.parse(jsonStr);
  console.log(jsonStr);
  var finBookHeader = new finHeader(finBookInfo);
  util.saveTable("Financial Book" , finBookHeader , res)
}

exports.createNewRec = function(bookWithName , res){
  //var bookWithName = JSON.parse(jsonStr);
  var rawbookName = bookWithName.recid;
  var bookInfoArr = new Array();
  bookInfoArr = rawbookName.split(':');

  var rec = new Object();
  rec.createDate = bookWithName.date;
  rec.finbookId = new mongoose.Types.ObjectId(bookInfoArr[1]);
  rec.payment = bookWithName.payment;
  rec.amount = bookWithName.amount;
  rec.whatfor = bookWithName.whatfor;
  console.log('Save the rec' + rec.toString());
  var finBookModel = mongoose.model(bookInfoArr[0] , finBookBodySchema);
  var finBookRec = new finBookModel(rec);
  util.saveTable("Financial Record" , finBookRec , res);
}

exports.listRecbyFinbook = function(userID , clientStartDate , clientEndDate, res){
  //var matchCondition = new Object();
  var matchCondition = {"$match": {ownerID : userID}};
  var joinQuery = { "$lookup": {
      from: "finbook_goodeffort2003_gmail.coms",
      localField: "_id",
      foreignField: "finbookId",
      as: "reclist"
    }
  }
  var unwindList = {"$unwind": "$reclist"};
  var projectConf = {
    "$project":{
      "_id": 1,
      "finBookName": 1,
      "ownerID": 1,
      "createDate": "$reclist.createDate",
      "bookPack": 1,
      "pay_method": "$reclist.payment.pay_method",
      "amount": "$reclist.payment.amount",
      "currency": "$reclist.payment.currency"
    }
  };
  var date = "2018-02-06";
  var endDate = moment().format('YYYY-MM-DD');
  var startDate = moment().subtract(2 , 'day').format('YYYY-MM-DD');

  console.log('The start is %s and the end is %s' , clientStartDate  , clientEndDate);

  var filterendDates = {"$match": {"reclist.createDate": {"$lt": new Date(clientEndDate)}}};
  var filterstartDates = {"$match": {"reclist.createDate": {"$gt": new Date(clientStartDate)}}};

  var queryArr = new Array()
  queryArr.push(matchCondition);
  queryArr.push(joinQuery);
  queryArr.push(unwindList);
  //queryArr.push(projectConf);

  if(clientEndDate != 0){
    queryArr.push(filterendDates);
  }

  if(clientStartDate != 0){
    queryArr.push(filterstartDates);
  }
  queryArr.push(projectConf);

  console.log(queryArr.toString());
  util.aggregateOpt('finbookInfo' , finHeader , queryArr, res );

}

exports.listFinbookbyOwner = function(userID , res){
  util.findWithCondition('finBookInfo' , finHeader , {ownerID: userID} , res);

}
