var http = require('http')
var socketIO = require('socket.io')
var fs = require('fs')
var server, io

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
