$(function() {
  var requestURL = HOST + 'report/reportdata?';

  var cookieValue = JSON.parse(Cookies.get('perfibook'));
  var userID = cookieValue.email;
  //Report last 3 days' data
  var endDate = moment().add(1 , 'day').format('YYYY-MM-DD');
  var startDate = moment().subtract(10 , 'day').format('YYYY-MM-DD');

  requestURL = requestURL + 'userid=' + userID + '&startdate=' + startDate + '&enddate=' + endDate;
  console.log(requestURL);

  getBasicUserData(requestURL , processReportData);
})
