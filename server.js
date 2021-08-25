const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./db');

const mongoose = require('mongoose');
const messageModel = mongoose.model('Message');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
    messageModel.find({}, (err, messages) => {
        if(err){
            res.sendStatus(500);
        }else{
            res.send(messages);
        }
    })  
});

app.post('/message', (req, res) => {
    messageModel.create({
        name: req.body.name,
        message: req.body.message
    }, (err, message) => {
        if(err){
            res.sendStatus(300);
        }else{
            //emit new message to the client
            io.emit('message', req.body);
            res.sendStatus(200);
            console.log(`Message posted from ${req.body.name}.`);
        }
    });
});

io.on('connection', (socket) => {
    console.log("A user has connected");
});

var server = http.listen(3000, () => {
    console.log("The server is liestening on port ", server.address().port);
});