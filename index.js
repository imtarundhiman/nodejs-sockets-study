require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)

const io = socketio(server)

const publicPath = path.join(__dirname, './public')

app.use(express.static(publicPath))

let count = 0

io.on('connection', (socket) => {

    socket.emit('connected', 'Welcome to our app !')

    socket.on('countChanged', () => {
        count ++
        io.emit('countUpdated', count)
    })

    socket.on('messageSend', (message) => {
        io.emit('readMessage', message)
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=> {
    console.log(`Application is running on port ${PORT}`)
})