var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var url = require('url');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

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


// var server = require('http').createServer();
// var url = require('url');
// var WebSocketServer = require('ws').Server;
// var wss = new WebSocketServer({ server: server });
// var express = require('express');
// var app = express();
// var port = process.env.PORT || 5000;

// app.use(express.static(__dirname + '/public'));

// app.use(function (req, res) {
//   res.send({ msg: "hello" });
// });

// wss.on('connection', function connection(ws) {
//   var location = url.parse(ws.upgradeReq.url, true);
//   // you might use location.query.access_token to authenticate or share sessions
//   // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

//   var turn = 0;
//   var boardState = {
//     'a': [null, null, null],
//     'b': [null, null, null],
//     'c': [null, null, null]
//   };
//   var checkForWinner = function(token) {
//     checkRows(token);
//     checkCols(token);
//     checkDiag(token);
//   };

//   var checkRows = function(token) {
//     for (var row in boardState) {
//       var count = 0;
//       boardState[row].every(function(value, index) {
//         if (value === token) {
//           if (count === 2) {
//             ws.send('winner', token);
//           } else {
//             count++;
//           }
//           return true;
//         }
//         return false;
//       });
//     }
//   };

//   var checkCols = function(token) {
//     for (var i = 0; i < 3; i++) {
//       if (boardState.a[i] !== null) {
//         if (boardState.a[i] === boardState.b[i] && boardState.b[i] === boardState.c[i]) {
//           ws.send('winner', token);
//         }
//       }
//     }
//   };

//   var checkDiag = function(token) {
//     if (boardState.a[0]) {
//       if (boardState.a[0] === boardState.b[1] && boardState.b[1] === boardState.c[2]) {
//         ws.send('winner', token);
//       }
//     }
//     if (boardState.a[2]) {
//       if (boardState.a[2] === boardState.b[1] && boardState.b[1] === boardState.c[0]) {
//         ws.send('winner', token);
//       }
//     }
//   };

//   ws.on('turnStart', function(move) {
//     turn++;
//     var token = (turn%2 === 1) ? 'X':'O';
//     boardState[move.row][move.col] = token;
//     if (turn >= 5) {
//       checkForWinner(token);
//     }
//     ws.send('turnFinish', {'token': token, 'row': move.row, 'col': move.col});
//   });

// });

// server.on('request', app);
// server.listen(port, function () { console.log('Listening on ' + server.address().port) });

