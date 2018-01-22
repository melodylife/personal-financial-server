var express = require('express');
var router = express.Router();

router.get('/' , function(req , res){
  var healthObj = new Object();
  healthObj.result = 'success';
  res.send(healthObj);
});

module.exports = router;
