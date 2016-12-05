const io = require('socket.io-client');

const socket = io.connect('http://localhost:8080', {query: "username=mimo&password=mypassword"});

socket.on('connect', s => {
	console.log("connected");
})

socket.on('newLocation', data => {
	console.log(data);
})