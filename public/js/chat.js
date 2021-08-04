const socket = io()

// socket connection message
socket.on('connected', (message) => {
    console.log(message)
})

// get the updated count
socket.on('countUpdated', (count) => {
    console.log('count updated', count)
})

// read the message
socket.on('readMessage', (message) => {
    console.log(message)
})

//read the geolocation
socket.on('readGeolocation', (location) => {
    console.log(location)
})

// increment a count
document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('countChanged')
})

// send a message
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    let message = e.target.querySelector('input').value

    if(!message.length){
        console.log('Please write a message first !')
    }

    socket.emit('messageSend', message)
})

document.querySelector('#location').addEventListener('click', (e) => {
    if(!navigator?.geolocation){
        return alert('your browser does not supports location sharing !')
    }

    navigator.geolocation.getCurrentPosition((position)=> {

        let cords = {
            latitude:position.coords.latitude,
            longitude: position.coords.longitude
        }

        socket.emit('geolocationSend', cords)
    })
})