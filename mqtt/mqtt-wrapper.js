const mqtt = require('mqtt');
const DhtDB = require('../models/dht');

const client  = mqtt.connect('mqtt://localhost:1883');
 
client.on('connect', function () {
  client.subscribe('ttgo/dht', function (err) {
    if (!err) {
      console.log('mqtt-wrapper : connected!');
    }
  })
})

var count = 0;
client.on('message', function (topic, m) {

  if(count++%100==0) {
    // message is Buffer
    console.log(m.toString());
    const msg = m.toString().split(' ');
    console.log(msg[0].substring(2,6));
    console.log(msg[1].substring(2,6));

    const d = new DhtDB({
      date: new Date(),
      rack: 'A1',
      temp: msg[0].substring(2,6),
      humidity: msg[1].substring(2,6)
    });
    d.save().then(() => console.log('good!'));
  }
})