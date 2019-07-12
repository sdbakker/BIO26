var http = require('http')
var socketIO = require('socket.io')
var fs = require('fs')
var server, io
var gpio = require('rpi-gpio')

var BUTTON1_GPIO = 17
var LED1_GPIO = 27

server = http.createServer((req, res) => {
  fs.readFile(__dirname + '/public/index.html', (err, data) => {
    res.writeHead(200)
    res.end(data)
  })
})

server.listen(8000)
io = socketIO(server)

io.on('connection', (socket) => {
  socket.emit('hi-from-server', {
    greeting: 'hi client'
  })
  socket.on('hi-from-client', (message) => {
    console.log(message)
  })
})

gpio.on('change', function(channel, value) {
	console.log('Channel ' + channel + ' ' + value);
	gpio.write(LED1_GPIO, value);
});

gpio.setMode(gpio.MODE_BCM);
gpio.setup(BUTTON1_GPIO, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(LED1_GPIO, gpio.DIR_LOW);
