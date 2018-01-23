var HOST = 'http://perfi.changworkshop.com:1088/';

function postRequestHandler(targeturl , payload){
  var encoder = new Base64()
  var encodePayload = encoder.encode(payload);
  console.log(encodePayload);
  $.ajax({
    url: targeturl,
    type: 'POST',
    data: encodePayload,
    contentType: 'application/json',
    success: function(result){
      alert('Successful calling');
      console.log(result);
    }
  });
}

function test(){
 // alert('This is a test');
}

function uploadRec() {
  alert('Uploading the Recs');

}


function createFinbook(){
  var bookName = $('#bookname')[0].value;
  var bookPack = $('#bookpack')[0].value;
  var ownerName = $('#owner')[0].value;
  if((bookName.trim() == '') || (bookPack.trim() == '') || (ownerName.trim() == '')){
    alert('The data can\'t be empty');
  }
  else{
    var rawTime = Date.now();
    var crDate = moment(rawTime).format('YYYY-MM-DD');
    //alert(crDate);
    var payload = new Object();
    payload.finBookName = bookName;
    payload.ownerID = ownerName;
    payload.createDate = crDate;
    payload.bookPack = bookPack;
  }

  postRequestHandler(HOST + "finbook/crnewbook" , JSON.stringify(payload));
}

function loginUser(){
  var email = $('#email')[0].value.toString().trim();
  var pwd = $('#password')[0].value.toString().trim();;
  var targetUrl = HOST + 'appinit/login?';
  targetUrl = targetUrl + 'userid=' + email + '&password=' + pwd;
  $.ajax({
    url: targetUrl,
    type: 'GET',
    success: function(rawresult){
      //var result = JSON.parse(rawresult);
      if(-1 == rawresult.result){
        alert('Failed to login');
      }
      else{
        Cookies.set('perfibook' , 'email:'+email , {expires:7});
        console.log('Login succeed');
        $('#loginwindow').html = '';
      }
    }

  });
}


function createUser(){

  var nickName = $('#nickname')[0].value;
  var email = $('#email')[0].value;
  var password = $('#password')[0].value;

  var bookpackArr = new Array();
  var paymethodArr = new Array();

  bookpackArr = $('#bookpack')[0].value.split(',');
  paymethodArr = $('#paymethod')[0].value.split(',');


  if((nickName.trim() == '') || (email.trim() == '') || (password.trim() == '')){
    alert('The data can\'t be empty');
  }
  else{
    var rawTime = Date.now();
    var crDate = moment(rawTime).format('YYYY-MM-DD');
    //alert(crDate);
    var payload = new Object();
    payload._id = email;
    payload.nick_name = nickName;
    payload.acctCrDate = crDate;
    payload.bookPack = bookpackArr;
    payload.payment_method = paymethodArr;
    payload.password = password;
  }

  postRequestHandler(HOST + "appinit/reg" , JSON.stringify(payload));
}

function Base64() {
  // private property
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }
  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }
  // private method for UTF-8 encoding
  _utf8_encode = function (string) {
    string = string.toString().replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  // private method for UTF-8 decoding
  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
