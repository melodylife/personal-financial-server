$(function(){
//  alert('Test');
  if((Cookies.get('perfibook') == undefined) && !(window.location.href.toString().match(/login|createuser/))){
  //Cookies.set('test1' , 'temptest');
    alert('请登录');
    window.location.href = HOST + 'login';
    return;
  }

  if(Cookies.get('perfibook') == undefined){
    return;
  }

  cookieValue = JSON.parse(Cookies.get('perfibook'));
  var userInfoAPIUrl = HOST + "appinit/readuser?userid=" + cookieValue.email;
  //fill the payment_method list
  if ($("#paymethods") !== undefined){
    fillDropDownwithData(userInfoAPIUrl , "payment_method" , "payment_method_list" , "paymethods");
  }

  //fill the bookpack list
  if ($("#bookpacklist") !== undefined){
    fillDropDownwithData(userInfoAPIUrl , "bookPack" , "book_pack_list" , "bookpacklist");
  }
});
