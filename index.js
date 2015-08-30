var express     = require('express');
var app         = express();
var server      = require('http').Server(app);
var io          = require('socket.io')(server);

server.listen(3000);

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  var turn = 0;
  var boardState = {
    'a': [null, null, null],
    'b': [null, null, null],
    'c': [null, null, null]
  };

  socket.on('turnStart', function(move) {
    turn++;
    var token = (turn%2 === 1) ? 'X':'O';
    boardState[move.row][move.col] = token;
    if (turn >= 5) {
      checkForWinner(token);
    }
    socket.emit('turnFinish', {'token': token, 'row': move.row, 'col': move.col});
  });

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
            socket.emit('winner', token);
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
          socket.emit('winner', token);
        }
      }
    }
  };

  var checkDiag = function(token) {
    if (boardState.a[0]) {
      if (boardState.a[0] === boardState.b[1] && boardState.b[1] === boardState.c[2]) {
        socket.emit('winner', token);
      }
    }
    if (boardState.a[2]) {
      if (boardState.a[2] === boardState.b[1] && boardState.b[1] === boardState.c[0]) {
        socket.emit('winner', token);
      }
    }
  };
});
