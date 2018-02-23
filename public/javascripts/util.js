var HOST = 'http://perfi.changworkshop.com:1088/';
var colorSet = [
  '#e6194b',//red
  '#3cb44b',//green
  '#ffe119',//yellow
  '#0082c8',//blue
  '#f58231',//orange
  '#911eb4',//purple
  '#46f0f0',//cyan
  '#f032e6',//magenta
  '#d2f53c',//lime
  '#fabebe',//pink
  '#008080',//teal
  '#e6beff',//lavender
  '#aa6e28',//brown
  '#fffac8',//beige
  '#800000',//maroon
  '#aaffc3',//mint
  '#808000',//olive
  '#ffd8b1',//coral
  '#000080',//navy
  '#808080',//grey
  '#FFFFFF',//white
  '#000000'//black
];

function chartColorArray(colorAmt){

  var colorArray = new Array([]);
  if(colorAmt > colorSet.length){
    var linkArrayAmt = parseInt(colorAmt / colorSet.length);
    var remArrayAmt =  colorAmt % (colorSet.length);
    for(var i = 0 ; i < linkArrayAmt; i++){
      colorArray = colorArray.concat(colorSet);
    }
    colorArray = colorArray.concat(colorSet.slice(0 , remArrayAmt));
  }
  else{
    colorArray = colorSet.slice(0 , colorAmt);
  }
  return colorArray;
}

function postRequestHandler(targeturl , payload){
  var encoder = new Base64()
  var encodePayload = encoder.encode(payload);
  console.log(payload);
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

function getBasicUserData(queryUrl , opFunc){
  $.ajax({
    url: queryUrl,
    type: 'GET',
    success: function(result){
      opFunc(result.data);
    }
  });
}

function fillDropDownwithData(targetUrl , field , dropdownid , placementid){

  getBasicUserData(targetUrl , function(data){
    //console.log("Here are the data " + data[0]._id);
    var selectHtml = "<select id='" + dropdownid + "'>VALUES</select>";
    var values = "";
    for(var i = 0; i < data[0][field].length; i++){
      values += '<option value="' + data[0][field][i] + '">' + data[0][field][i] + '</option>';
    }
    values = selectHtml.replace("VALUES" , values);
    $('#' + placementid).html(values);
  });
}

function test(){
 // alert('This is a test');
}

function uploadRec() {
  alert('Uploading the Recs');
  var payloadRaw = new Object();

  var payment = new Object();
  payment.currency = $('select#cur')[0].value;
  payment.pay_method = $('select#payment_method_list')[0].value;
  payment.amount = $('input#amount')[0].value;

  payloadRaw.createDate = $('input#rectime')[0].value;
  payloadRaw.recid = $('select#finbooklist')[0].value;
  payloadRaw.bookName = $('select#finbooklist')[0].text;
  payloadRaw.payment = payment;

  var targetUrl = HOST + 'finbook/savefinRec';
  postRequestHandler(targetUrl , JSON.stringify(payloadRaw));
}


function createFinbook(){
  var cookieValue = JSON.parse(Cookies.get('perfibook'));

  var bookName = $('#bookname')[0].value;
  var bookPack = $('#book_pack_list')[0].value;
  var ownerName = cookieValue.email;

  console.log(bookName + bookPack + ownerName);
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
        var cookieValueRaw = new Object();
        cookieValueRaw.email = email;

        var cookieValue = JSON.stringify(cookieValueRaw);
        Cookies.set('perfibook' , cookieValue , {expires:7});
        console.log('Login succeed');
        $('div#login').html('');
        window.location.href = HOST + '';
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
