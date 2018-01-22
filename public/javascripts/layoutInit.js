$(function(){
//  alert('Test');
if((Cookies.get('perfibook') == undefined) && !(window.location.href.toString().match(/login|createuser/))){
  //Cookies.set('test1' , 'temptest');
  alert('请登录')
  window.location.href = HOST + 'demo/login'
} 
});
