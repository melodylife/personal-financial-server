$(function() {
  var requestURL = HOST + 'report/reportdata?';

  var cookieValue = JSON.parse(Cookies.get('perfibook'));
  var userID = cookieValue.email;
  //Report last 3 days' data
  var endDate = moment().add(1 , 'day').format('YYYY-MM-DD');
  var startDate = moment().subtract(4 , 'day').format('YYYY-MM-DD');

  console.log('Here are the dates %s and %s' , endDate , startDate);

  requestURL = requestURL + 'userid=' + userID + '&startdate=' + startDate + '&enddate=' + endDate;
  console.log(requestURL);

  getBasicUserData(requestURL , processReportData);
})
