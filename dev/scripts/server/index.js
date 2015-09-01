var WebSocketServer = require("ws").Server;
var express = require('express');
var url = require('url');
var http = require('http');

var app = express();
var port = process.env.PORT || 3000;

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.render('pages/index');
});

var server = http.createServer(app);
server.listen(port);

var wss = new WebSocketServer({ server: server });
wss.on('connection', function(ws) {
  console.info("websocket connection open");

  var boardState = {
    'turn': 0,
    'a': [null, null, null],
    'b': [null, null, null],
    'c': [null, null, null]
  };

  ws.on('message', function(message) {
    boardState.turn++;
    var move = JSON.parse(message);
    var token = (boardState.turn%2 === 1) ? 'X':'O';
    var response = {
      "eventType": "logMove",
      "token": token,
      "row": move.row,
      "col": move.col
    };
    checkForWinner();
    boardState[move.row][move.col] = token;
    ws.send(JSON.stringify(response));
  });

  var checkForWinner = function() {

  };

  ws.on("close", function() {
    console.log("websocket connection close");
  });

});
