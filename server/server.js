const express = require('express')
const gpio = require('rpi-gpio')
const raspi = require('raspi')
const Serial = require('raspi-serial').Serial

const app = express()

//const BUTTON1_GPIO = 17

server = app.listen(3001, () => {
  console.log('running server on port 3001');
})

const io = require('socket.io')(server)

io.on('connect', (socket) =>{
  console.log('client connected');
})

var options = { portId: '/dev/ttyACM0' }

raspi.init(() => {
  var serial = new Serial(options)
  serial.open(() => {
    serial.on('data', (data) => {
      //process.stdout.write(data)
      io.emit('MESSAGE', data[0])
    });
  });
});



//gpio.on('change', (channel, value) => {
//	io.emit('MESSAGE', value)
//})

//gpio.setMode(gpio.MODE_BCM);
//gpio.setup(BUTTON1_GPIO, gpio.DIR_IN, gpio.EDGE_BOTH);
