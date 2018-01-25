var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/createfinbook', function(req, res) {
  res.render('createfinbook', { title: 'Express' });
});

router.get('/createuser', function(req, res) {
  res.render('createuser', { title: 'Express' });
});


router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

router.get('/recorditems', function(req, res) {
  res.render('recorditems', { title: 'Express' });
});

module.exports = router;
