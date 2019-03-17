var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'ttgoserver' });
});

router.post('/dht11', function(req, res, next) {

  /* Dummy data for UI test  */
  var d = {};  
  d.label = ['17:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  d.temp = [21,22,21,23,24,21,21,22,21,24,21,20];
  d.humidity = [42,32,42,53,43,44,32,42,53,43,44,41];

  res.send(d);
});

router.post('/relay', function(req, res, next) {
  var ch = req.body.channel;

  if(ch=='1') {
    console.log('ch1');
  }
  else if(ch=='2') {
    console.log('ch2');
  }
  else if(ch=='3') {
    console.log('ch3');
  }
  else if(ch=='4') {
    console.log('ch4');
  }
  else {
    console.log('error ' + ch);
  }

  res.send('ok');
});

module.exports = router;