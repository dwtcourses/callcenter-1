// Static Express server
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const fs = require('fs');
const config = require('./config');

// Create HTTP server
const app = express();
const server = http.Server(app);

// Create web socket server
const io = socketio(server);

// Init server payloads from disk
const payloadData = fs.readFileSync(`${__dirname}/db.json`).toString();
const payloads = payloadData ? JSON.parse(payloadData) : [];

// Listen for new socket client (connection)
io.on('connection', (socket) => {
    // console.log(socket);
    // Send all payloads to connecting client
    socket.emit('all_payloads', payloads);

    // Listen for new payloads
    socket.on('new_payload', (payload) => {

        // Add to payloads
        payloads.unshift(payload);
        console.log(payload)
        // Broadcast new payload to all connected clients
        socket.broadcast.emit('new_payload', payload);

        // Persist to disk
        fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(payloads));
        console.log(payloads)
    });

});

// Server "app" directory
app.use(express.static(`${__dirname}/../app`));

// Server "node_modules" directory
app.use('/modules', express.static(`${__dirname}/../node_modules`));

// Start Server
server.listen(config.server.port, () => {
    console.log(`Call-center application is serving on ${config.server.host}:${config.server.port}`)
});
