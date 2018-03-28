var express = require('express');
var http = require('http');
var path = require("path");
var io = require('socket.io');
var bodyParser = require('body-parser')
var express = require('express');
var Metronome = require('timepiece').Metronome;
var currplayer = 0;
var appTempo = 400;
var userID = 0;
var playerAmount = 0;
var globalbarType = 0;
var currtimesec = 30;
var currtimemin = 0;
var currtimesecrev = 0;
var currtimesminrev = 0;



var app = express();
var server  = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var width = 16;
var height = 13;
var seqarraystate = [];

//TODO create an array from var width and height

var port = process.env.PORT || 3000;


function init(){
  for (var i = 0; i < width*height; i++){
    //seqarraystate[i] = [];
    seqarraystate[i] = {instrument: 'synth01',
    color: 'white',
    activated: 0,
    serverUID: userID};
  }
}

init();


function resetGrid(){
  for (var i = 0; i < width*height; i++){
    seqarraystate[i].activated = 0;
}
currtimesec = 30;
currtimemin = 0;
globalbarType = 0;
//sockets.emit('sendSteps', seqarraystate);
sockets.emit('resetAll', seqarraystate);

console.log('reset all');

}

app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var obj = {
    "array": seqarraystate,
    "width": width,
    "height": height,
    "userNumber": userID

  }
  res.send(obj)

});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


var sockets = io(server);
// configure socket handlers
sockets.on('connection', function(socket){
  //Hi this is all the users connected

  sockets.emit('usercount', sockets.engine.clientsCount);
  //console.log('User num: ', sockets.engine.clientsCount);


  playerAmount = playerAmount + 1;
  //console.log('playerAmount', playerAmount);
  userID = userID+1;
  if (userID >= 11){
    userID = 1;
  }

  //console.log(userID);
  socket.send(socket.id);


  //console.log('a user connected',socket.id);
  socket.on('sendStep', function(data){
    seqarraystate = data.theData;
    sockets.emit('sendSteps', seqarraystate);
    userID = sockets.engine.clientsCount;
    //console.log(seqarraystate);
  });


  //console.log('a user connected',socket.id);
  socket.on('ClientReset', function(resetfromclient){
  resetGrid();

  //console.log('userreset');
  });

  socket.on('disconnect', function(){
    //Hi somebody dissconencted we have a different count!
    playerAmount = playerAmount - 1;
    //console.log('playerAmount', playerAmount);

    sockets.emit('usercount', sockets.engine.clientsCount);
    //console.log('User num: ', sockets.engine.clientsCount);
  });
});



////////////////tempo///////////
// By default, a metronome object is set to 60 bpm.
var metronome = new Metronome();
// But you could also initialize one at another tempo.
// It emits a 'tick' event on each beat
metronome.set(appTempo);

metronome.on('tick', function(){
  currplayer ++;
  if (currplayer == 16){
    currplayer = 0;
    globalbarType ++;
    sockets.emit('globalTimetype', globalbarType);
  }
  if (globalbarType >= 55){
    appTempo = 0;
  }


  if (currplayer%8 == 1){
    currtimesec ++
  }



  if (currtimesec >= 60){
    currtimemin ++;
    currtimesec = 0;
  }


  currtimesecrev = 60 - currtimesec;
  currtimeminrev = 2 - currtimemin;


  if((currtimesecrev == 1) && (currtimeminrev == 0)){
    resetGrid();

  }



  sockets.emit('currplayer', currplayer);
  sockets.emit('currTime',currtimesecrev, currtimeminrev);
});
metronome.start();

////////////////tempo///////////
