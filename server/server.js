const express = require('express')
const gpio = require('rpi-gpio')

const app = express()

const BUTTON1_GPIO = 17
//const LED1_GPIO = 27


server = app.listen(3001, () => {
  console.log('running server on port 3001');
})

const io = require('socket.io')(server)

io.on('connect', (socket) =>{
  console.log('client connected');
})

gpio.on('change', (channel, value) => {
	io.emit('MESSAGE', value)
})

gpio.setMode(gpio.MODE_BCM);
gpio.setup(BUTTON1_GPIO, gpio.DIR_IN, gpio.EDGE_BOTH);
//gpio.setup(LED1_GPIO, gpio.DIR_LOW);
