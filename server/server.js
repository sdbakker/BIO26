const express = require('express')

const app = express()

server = app.listen(3001, () => {
  console.log('running server on port 3001');
})

const io = require('socket.io')(server)

io.on('connect', (socket) =>{
  console.log(socket.id);
})
