var express = require('express');
var router = express.Router();

const DhtDB = require('../models/dht');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard/index', { title: 'ttgoserver' });
});

router.post('/dht11', function(req, res, next) {
  var r = req.body.rack;
  var d = {};

  DhtDB.
    find({rack:r}).
    sort('date').
    limit(16).
    exec(function (err, docs) {
      /** check docs */
      if(!docs) {
        console.log('db is null.');
        res.send('null');
        return;
      }

      if(0==docs.length) {
        console.log('db is empty. ' + err);
        res.send('null');
        return;
      }

      d.rack = r;
      d.label = new Array();
      d.temp = new Array();
      d.humidity = new Array();

      //organize date for chart.js
      for(var i=0 ; i<docs.length ; i++) {
        d.label[i] = docs[i].date.toTimeString().substr(0,5);
        d.temp[i] = docs[i].temp;
        d.humidity[i] = docs[i].humidity;
      }

      res.send(d);
    });
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