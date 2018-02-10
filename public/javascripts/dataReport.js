function processReportData(data){
  var colHeadersArray = ['Date' , 'Fin Book' , 'Fin Pack' , 'Pay Method' , 'Amount'];
  var colWidthsArray = [100 , 300 , 300 , 300 , 80];
  var dataArray = new Array();
  for(var i = 0; i < data.length; i++){
    var crDate = moment(data[i].reclist.createDate).format('YYYY-MM-DD');
    var finBook = data[i].finBookName;
    var finPack = data[i].bookPack;
    var payMethod = data[i].reclist.payment.pay_method;
    var amount = data[i].reclist.payment.amount;

    var tblRow = [crDate , finBook , finPack , payMethod , amount];
    dataArray.push(tblRow);
  }

  $('#reportTable').jexcel({
    data: dataArray,
    colHeaders: colHeadersArray,
    colWidths: colWidthsArray,
    orderBy: 1
  });
}
