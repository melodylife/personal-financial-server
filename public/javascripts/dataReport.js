function processReportData(data){

  var chartDateObj = new Object();

  for(var i = 0; i < data.length; i++){
    var crDate = moment(data[i].reclist.createDate).format('YYYY-MM-DD');

    if(chartDateObj[crDate] == undefined){
      chartDateObj[crDate] = 0;
    }
    else{
      chartDateObj[crDate] += data[i].reclist.payment.amount;
    }
  }

  var lineChartCanvas = $('#lineChart');
  var lineChart = new Chart(lineChartCanvas , {
    type: 'line',
    data: {
      datasets: [{
        label: 'Spend',
        data: Object.values(chartDateObj)
      }],
      labels: Object.keys(chartDateObj)
    },
    options: {
      onClick: function (evt){
        var activePoint = this.getElementsAtEvent(evt)[0];
        if(activePoint._chart.data != undefined){
          var data = activePoint._chart.data;
          var labels = data.labels;
          var dataSets = data.datasets;
          var datasetIndex = activePoint._index;

          var label = labels[datasetIndex];
          console.log(label);
        }
      }
    }
  });
}
