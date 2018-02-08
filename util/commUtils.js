var constants = require("./constants");


exports.ramString = function(length){
  len = length || 32;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnOpqrstuvwxyz0123456789';
  var maxPos = $chars.length;
  var ramStr = '';
  for (i = 0; i < length; i++) {
    ramStr += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return ramStr;
}

exports.saveTable = function(objName , optObject , res){
  var rstObj = new Object();
  rstObj.result = constants.resStatus.SUCCESS;
  optObject.save(function(err){
    if(!err){
      res.send(rstObj);
      return;
    }
    console.log("Failed to create a new " + objName + " " + err.message);
    rstObj.result = constants.resStatus.FAILED;
    rstObj.errormsg = err.message;
    res.send(rstObj);
  });
}


exports.aggregateOpt = function(objName , optObj , condition , res){
  optObj.aggregate(condition , function(err , data){
    if(!err){
      if(0 == data.length || null == data){
        var rst = new Object();
        rst.result = constants.resStatus.NO_DATA;
        console.log('there\'s no data in ' + objName);
      }
      else{
        var rst = new Object();
        rst.result = constants.resStatus.SUCCESS;
        rst.data = data
      }
      rst.data = data;
      res.send(rst);
      return;
    }
    else{
      res.send({"result":constants.resStatus.FAILED , "error":err.message});
      return;
    }
  }
  );
}


exports.findWithCondition = function(objName , optObj , condition , res){
  optObj.find(condition , function(err , data){
    if(!err){
      if(0 == data.length || null == data){
        var rst = new Object();
        rst.result = constants.resStatus.NO_DATA;
        console.log('there\'s no data in ' + objName);
      }
      else{
        var rst = new Object();
        rst.result = constants.resStatus.SUCCESS;
        rst.data = data
      }
      for(var i = 0; i < data.length; i++){
        if(data[i].password != undefined){
          data[i].password = "";
        }
      }
      rst.data = data;
      res.send(rst);
      return;
    }
    else{
      res.send({"result":constants.resStatus.FAILED , "error":err.message});
      return;
    }
  }
  );
}

exports.renderWithData = function(colObj , condition , res){

}
