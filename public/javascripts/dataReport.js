var paymentMethodPieChart;
var finBookPieChart;
var bookPackPieChart;


function groupByAnyField(rawdata , field){
  var chartObj = new Object();

  for(var i = 0; i < rawdata.length; i++){
    var tempField = '';
    if('createDate' == field){
      var tempField = moment(rawdata[i][field]).format('YYYY-MM-DD');
    }
    else{
      tempField = rawdata[i][field];
    }

    if(chartObj[tempField] === undefined){
      chartObj[tempField] = rawdata[i].amount;
    }
    else{
      chartObj[tempField] += rawdata[i].amount;
    }
  }
  //sort the object elements for date sequence line chart 

  if('createDate' == field){
    var tempKeys = Object.keys(chartObj);
    tempKeys.sort();
    var sortedObj = new Object();
    for (k in tempKeys){
      sortedObj[tempKeys[k]] = chartObj[tempKeys[k]];
    }
    return sortedObj;

  }
  return chartObj;
}

function refreshDetailPies(rawdata){
  var paymentMethodObj = groupByAnyField(rawdata , 'pay_method');
  var finBookObj = groupByAnyField(rawdata , 'finBookName');
  var bookPackObj = groupByAnyField(rawdata , 'bookPack');

  var paymenthodchart = $('#paymenthodchart');
  var finbookchart = $('#finbookchart');
  var bookpackchart = $('#bookpackchart');

  //console.log(chartColorArray(Object.values(paymentMethodObj).length));
  /*paymentMethodPieChart.clear();
  paymentMethodPieChart = new Chart(paymenthodchart , {
    type: 'pie',
    data: {
      datasets: [{
        data: Object.values(paymentMethodObj),
        backgroundColor: chartColorArray(Object.values(paymentMethodObj).length)
      }],
      labels: Object.keys(paymentMethodObj)
    }
  });*/
  //update payment method pie chart
  paymentMethodPieChart.data.datasets[0].data = Object.values(paymentMethodObj)
  paymentMethodPieChart.data.labels = Object.keys(paymentMethodObj);
  paymentMethodPieChart.update();

  //update finbook pie chart
  finBookPieChart.data.datasets[0].data = Object.values(finBookObj);
  finBookPieChart.data.labels = Object.keys(finBookObj);
  finBookPieChart.update();

  //update bookpackpiechart
  bookPackPieChart.data.datasets[0].data = Object.values(finBookObj);
  bookPackPieChart.data.labels = Object.keys(bookPackObj);
  bookPackPieChart.update();

}

function processReportData(rawdata){


  var chartDateObj = groupByAnyField(rawdata , 'createDate');
  var paymentMethodObj = groupByAnyField(rawdata , 'pay_method');
  var finBookObj = groupByAnyField(rawdata , 'finBookName');
  var bookPackObj = groupByAnyField(rawdata , 'bookPack');

  var lineChartCanvas = $('#lineChart');
  var paymenthodchart = $('#paymenthodchart');
  var finbookchart = $('#finbookchart');
  var bookpackchart = $('#bookpackchart');

  //console.log(chartColorArray(Object.values(paymentMethodObj).length));



  paymentMethodPieChart = new Chart(paymenthodchart , {
    type: 'pie',
    data: {
      datasets: [{
        data: Object.values(paymentMethodObj),
        backgroundColor: chartColorArray(Object.values(paymentMethodObj).length)
      }],
      labels: Object.keys(paymentMethodObj)
    }
  });

  finBookPieChart = new Chart(finbookchart , {
    type: 'pie',
    data: {
      datasets: [{
        data: Object.values(finBookObj),
        backgroundColor: chartColorArray(Object.values(finBookObj).length)
      }],
      labels: Object.keys(finBookObj)
    }
  });

  bookPackPieChart = new Chart(bookpackchart , {
    type: 'pie',
    data: {
      datasets: [{
        data: Object.values(bookPackObj),
        backgroundColor: chartColorArray(Object.values(bookPackObj).length)
      }],
      labels: Object.keys(bookPackObj)
    }
  });

  console.log(Object.keys(chartDateObj));
  var lineChart = new Chart(lineChartCanvas , {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Spend',
        data: Object.values(chartDateObj),
        backgroundColor: "transparent",
        borderColor: "#3cba9f"
      }],
      labels: Object.keys(chartDateObj)
    },
    options: {
      onClick: function (evt){
        var activePoint = this.getElementsAtEvent(evt)[0];
        if(activePoint._chart.data != undefined){
          var data = activePoint._chart.data;

          var chartLabels = data.labels;
          var dataSets = data.datasets;
          var datasetIndex = activePoint._index;
          var clkLabel = chartLabels[datasetIndex];
          //console.log(rawdata);
          var dataByDate = new Array();

          for(var i = 0; i < rawdata.length; i++){
            if(moment(rawdata[i].createDate).format('YYYY-MM-DD') == clkLabel){
              dataByDate.push(rawdata[i]);
            }
          }
          refreshDetailPies(dataByDate);

        }
      }
    }
  });
}
