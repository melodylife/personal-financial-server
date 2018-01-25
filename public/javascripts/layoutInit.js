$(function(){
//  alert('Test');
if((Cookies.get('perfibook') == undefined) && !(window.location.href.toString().match(/login|createuser/))){
  //Cookies.set('test1' , 'temptest');
  alert('请登录');
  window.location.href = HOST + 'demo/login';
}

var testurl = "http://perfi.changworkshop.com:1088/appinit/readuser?userid=test@test.com";
getBasicUserData(testurl , function(data){
  console.log("Here are the data " + data[0]._id);
  var selectHtml = "<select>VALUES</select>";
  var bookpackvalues = "";
  var paymethodvalues = "";
  for(var i = 0; i < data[0].bookPack.length; i++){
    bookpackvalues += '<option value="' + data[0].bookPack[i] + '">' + data[0].bookPack[i] + '</option>';
  }

  for(var i = 0; i < data[0].payment_method.length; i++){
    paymethodvalues += '<option value="' + data[0].payment_method[i] + '">' + data[0].payment_method[i] + '</option>';
  }

  var htmlbookpackText = selectHtml.replace('VALUES' , bookpackvalues);
  var paymethodText = selectHtml.replace('VALUES' , paymethodvalues);

  $("div#bookpacklist").html(htmlbookpackText);
  $("div#paymethods").html(paymethodText);
});
});
