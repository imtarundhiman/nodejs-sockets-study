require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')
// library to prevent profanity
const Filter = require('bad-words')
const filter = new Filter()

const server = http.createServer(app)

const io = socketio(server)

const publicPath = path.join(__dirname, './public')

app.use(express.static(publicPath))

let count = 0

io.on('connection', (socket) => {

    // socket.emit sends the message to the current connected user
    socket.emit('connected', 'Welcome to our app !')

    // socket.broadcast.emit sends the message to all connected sockets except current user
    socket.broadcast.emit('connected','A new user joined the chat')

    socket.on('countChanged', () => {
        count ++
        // io.emit send message to all connected users
        io.emit('countUpdated', count)
    })

    // we can send a delivery report back to user or server by using callback as third parameter
    socket.on('messageSend', (message, callback) => {

        if(filter.isProfane(message)){
            return callback('Please mind your language !')
        }

        io.emit('readMessage', message)
        callback()
    })

    socket.on('geolocationSend', (location) => {
        socket.broadcast.emit('readGeolocation', location)
    }) 

    socket.on('disconnect', () => {
        io.emit('readMessage','A user left the chat !')
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=> {
    console.log(`Application is running on port ${PORT}`)
})