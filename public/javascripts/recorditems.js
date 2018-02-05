$(function(){
  $('input#rectime')[0].value = moment().format('YYYY-MM-DD');
  $('#uprec')[0].onclick = uploadRec;

  var cookieValue = JSON.parse(Cookies.get('perfibook'));
  var finbookListAPI = HOST + 'appinit/readfinbooklist?userid=' + cookieValue.email;
  getBasicUserData(finbookListAPI , function(data){
    var optionsHTML = '';
    var html = '<select id = "finbooklist">VALUES</select>'
    for(var i = 0; i < data.length; i++){
      var bookName = data[i].finBookName;
      //var bookId = 'finbook_' + data[0]._id;
      var processedOwnerId = data[i].ownerID.replace('@' , '_');
      var bookId = 'finbook_' + processedOwnerId + ':' + data[i]._id;
      //var bookObjId = data[i]._id;
      optionsHTML += '<option value="' + bookId + '">' + bookName + '</option>';
    }
    html = html.replace('VALUES' , optionsHTML);
    $('div#finbook_list').html(html);

    console.log(html);
  });
});
