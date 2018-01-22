exports.base64ReqBodyParser = function(req , res , next){
  req.rawBody = '';
  req.setEncoding('utf8');
  
  req.on('data' , function(chunk){
    req.rawBody += chunk;
  });
  req.on('end' , function(){
    console.log("This is the post request " + req.rawBody);
    var bufDecode = new Buffer(req.rawBody , 'base64');
    req.body = bufDecode.toString();
    console.log("In the middleware");
    next();
  });
}
