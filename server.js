let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let messages = [
    {name: "Parth", message: "Hello"},
    {name: "Nihal", message: "Hi"}
];

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/message', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
    console.log(`Message posted from ${req.body.name}.`);
});

io.on('connection', (socket) => {
    console.log("A user has connected");
});

var server = http.listen(3000, () => {
    console.log("The server is liestening on port ", server.address().port);
});