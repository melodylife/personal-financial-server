var express = require('express');
var router = express.Router();
var finBook = require('../util/db/finbook');

router.post('/savefinRec', function(req, res) {

  console.log('Here\'s the saving fin book ' + req.body);
  var rawBody = JSON.parse(req.body);
  var bookRecWithName = new Object();
  bookRecWithName.bookName = rawBody.bookName;
  bookRecWithName.newRec = rawBody.bookName;
  finBook.createNewRec(bookRecWithName , res);
});

router.post('/crnewbook' , function(req , res){
  console.log('Here\'s the fin book creation');
  finBook.createNewFinBook(req.body , res);
});

module.exports = router;
