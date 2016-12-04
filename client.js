const io = require('socket.io-client');

const socket = io.connect('http://localhost:8080', {query: "username=mimo&password=$2a$05$HKfvDg7pgZy1pCiLhptVM.p9guScSJieHkKS2YALWRdrA5LFgbOsK"});

socket.on('connect', s => {
	console.log("connected");
})