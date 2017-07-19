var j5 = require("johnny-five");
var board = new j5.Board();

var LEDPIN = 13;
var OUTPUT = 1;

board.on("ready", function(){
  console.log('ready');
  var val = 0;
  this.pinMode(LEDPIN, OUTPUT);
});	

var express = require("express");
var app = express();
var port = 8000;
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
 
app.get("/", function(request, response) {
	response.render("index");
});

app.get("/set", function(request, response) {
    response.send("It works too!");
});
 
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	console.log('socket connection');
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
        console.log('socket send');
    });
    socket.on('set_pin', function (data) {
      var pin = LEDPIN;
      var bool = 1;

      console.log('Setting pin ' + pin + ' to ' + bool);
      board.pinMode(pin, OUTPUT);
      board.digitalWrite(pin, bool);
    });
});

console.log("Listening on port " + port);
