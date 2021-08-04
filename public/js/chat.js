const socket = io()

socket.on('connected', (message) => {
    console.log(message)
})

socket.on('countUpdated', (count) => {
    console.log('count updated', count)
})

socket.on('readMessage', (message) => {
    console.log(message)
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('countChanged')
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    let message = e.target.querySelector('input').value

    if(!message.length){
        console.log('Please write a message first !')
    }

    socket.emit('messageSend', message)
})