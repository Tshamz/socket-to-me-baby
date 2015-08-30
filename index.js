var WebSocketServer = require('ws').Server;
var http = require('http')
var express = require('express');
var url = require('url');
var port = process.env.PORT || 5000;

var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(80); //port 80 need to run as root
console.log("app listening on %d ", 80);

var server = http.createServer(app);
server.on('request', app);
server.listen(port);
console.log("http server listening on %d", port);

var wss = new WebSocketServer({ server: server });
wss.on('connection', function(ws) {
  console.info("websocket connection open");

  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  var turn = 0;
  var boardState = {
    'a': [null, null, null],
    'b': [null, null, null],
    'c': [null, null, null]
  };
  var checkForWinner = function(token) {
    checkRows(token);
    checkCols(token);
    checkDiag(token);
  };

  var checkRows = function(token) {
    for (var row in boardState) {
      var count = 0;
      boardState[row].every(function(value, index) {
        if (value === token) {
          if (count === 2) {
            ws.send(token);
          } else {
            count++;
          }
          return true;
        }
        return false;
      });
    }
  };

  var checkCols = function(token) {
    for (var i = 0; i < 3; i++) {
      if (boardState.a[i] !== null) {
        if (boardState.a[i] === boardState.b[i] && boardState.b[i] === boardState.c[i]) {
          ws.send(token);
        }
      }
    }
  };

  var checkDiag = function(token) {
    if (boardState.a[0]) {
      if (boardState.a[0] === boardState.b[1] && boardState.b[1] === boardState.c[2]) {
        ws.send(token);
      }
    }
    if (boardState.a[2]) {
      if (boardState.a[2] === boardState.b[1] && boardState.b[1] === boardState.c[0]) {
        ws.send(token);
      }
    }
  };

  ws.on('message', function(message) {
    console.log(message);

    turn++;
    var token = (turn%2 === 1) ? 'X':'O';
    boardState[move.row][move.col] = token;
    if (turn >= 5) {
      checkForWinner(token);
    }
    ws.send({'token': token, 'row': move.row, 'col': move.col});
  });
});

console.log("websocket server created");
