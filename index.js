var server = require('http').createServer();
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var express = require('express');
var app = express();
var port = 4080;

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.render('pages/index');
});
app.use(function (req, res) {
  res.send({ msg: "hello" });
});

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
server.on('request', app);
server.listen(port, function() {
  console.log('Listening on ' + server.address().port);
});


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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBzZXJ2ZXIgPSByZXF1aXJlKCdodHRwJykuY3JlYXRlU2VydmVyKCk7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgV2ViU29ja2V0U2VydmVyID0gcmVxdWlyZSgnd3MnKS5TZXJ2ZXI7XG52YXIgd3NzID0gbmV3IFdlYlNvY2tldFNlcnZlcih7IHNlcnZlcjogc2VydmVyIH0pO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xudmFyIHBvcnQgPSA0MDgwO1xuXG5hcHAuc2V0KCdwb3J0JywgKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJyk7XG5hcHAuc2V0KCd2aWV3cycsIF9fZGlybmFtZSArICcvdmlld3MnKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9wdWJsaWMnKSk7XG5hcHAuZ2V0KCcvJywgZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgcmVzcG9uc2UucmVuZGVyKCdwYWdlcy9pbmRleCcpO1xufSk7XG5hcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICByZXMuc2VuZCh7IG1zZzogXCJoZWxsb1wiIH0pO1xufSk7XG5cbnZhciB3c3MgPSBuZXcgV2ViU29ja2V0U2VydmVyKHsgc2VydmVyOiBzZXJ2ZXIgfSk7XG53c3Mub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbih3cykge1xuICBjb25zb2xlLmluZm8oXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBvcGVuXCIpO1xuXG4gIHZhciBsb2NhdGlvbiA9IHVybC5wYXJzZSh3cy51cGdyYWRlUmVxLnVybCwgdHJ1ZSk7XG4gIC8vIHlvdSBtaWdodCB1c2UgbG9jYXRpb24ucXVlcnkuYWNjZXNzX3Rva2VuIHRvIGF1dGhlbnRpY2F0ZSBvciBzaGFyZSBzZXNzaW9uc1xuICAvLyBvciB3cy51cGdyYWRlUmVxLmhlYWRlcnMuY29va2llIChzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTYzOTUyMjAvMTUxMzEyKVxuXG4gIHZhciB0dXJuID0gMDtcbiAgdmFyIGJvYXJkU3RhdGUgPSB7XG4gICAgJ2EnOiBbbnVsbCwgbnVsbCwgbnVsbF0sXG4gICAgJ2InOiBbbnVsbCwgbnVsbCwgbnVsbF0sXG4gICAgJ2MnOiBbbnVsbCwgbnVsbCwgbnVsbF1cbiAgfTtcbiAgdmFyIGNoZWNrRm9yV2lubmVyID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBjaGVja1Jvd3ModG9rZW4pO1xuICAgIGNoZWNrQ29scyh0b2tlbik7XG4gICAgY2hlY2tEaWFnKHRva2VuKTtcbiAgfTtcblxuICB2YXIgY2hlY2tSb3dzID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBmb3IgKHZhciByb3cgaW4gYm9hcmRTdGF0ZSkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIGJvYXJkU3RhdGVbcm93XS5ldmVyeShmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0b2tlbikge1xuICAgICAgICAgIGlmIChjb3VudCA9PT0gMikge1xuICAgICAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2hlY2tDb2xzID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgaWYgKGJvYXJkU3RhdGUuYVtpXSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoYm9hcmRTdGF0ZS5hW2ldID09PSBib2FyZFN0YXRlLmJbaV0gJiYgYm9hcmRTdGF0ZS5iW2ldID09PSBib2FyZFN0YXRlLmNbaV0pIHtcbiAgICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY2hlY2tEaWFnID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdKSB7XG4gICAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdID09PSBib2FyZFN0YXRlLmJbMV0gJiYgYm9hcmRTdGF0ZS5iWzFdID09PSBib2FyZFN0YXRlLmNbMl0pIHtcbiAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChib2FyZFN0YXRlLmFbMl0pIHtcbiAgICAgIGlmIChib2FyZFN0YXRlLmFbMl0gPT09IGJvYXJkU3RhdGUuYlsxXSAmJiBib2FyZFN0YXRlLmJbMV0gPT09IGJvYXJkU3RhdGUuY1swXSkge1xuICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd3Mub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cbiAgICB0dXJuKys7XG4gICAgdmFyIHRva2VuID0gKHR1cm4lMiA9PT0gMSkgPyAnWCc6J08nO1xuICAgIGJvYXJkU3RhdGVbbW92ZS5yb3ddW21vdmUuY29sXSA9IHRva2VuO1xuICAgIGlmICh0dXJuID49IDUpIHtcbiAgICAgIGNoZWNrRm9yV2lubmVyKHRva2VuKTtcbiAgICB9XG4gICAgd3Muc2VuZCh7J3Rva2VuJzogdG9rZW4sICdyb3cnOiBtb3ZlLnJvdywgJ2NvbCc6IG1vdmUuY29sfSk7XG4gIH0pO1xufSk7XG5cbmNvbnNvbGUubG9nKFwid2Vic29ja2V0IHNlcnZlciBjcmVhdGVkXCIpO1xuc2VydmVyLm9uKCdyZXF1ZXN0JywgYXBwKTtcbnNlcnZlci5saXN0ZW4ocG9ydCwgZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gJyArIHNlcnZlci5hZGRyZXNzKCkucG9ydCk7XG59KTtcblxuXG4vLyB2YXIgc2VydmVyID0gcmVxdWlyZSgnaHR0cCcpLmNyZWF0ZVNlcnZlcigpO1xuLy8gdmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xuLy8gdmFyIFdlYlNvY2tldFNlcnZlciA9IHJlcXVpcmUoJ3dzJykuU2VydmVyO1xuLy8gdmFyIHdzcyA9IG5ldyBXZWJTb2NrZXRTZXJ2ZXIoeyBzZXJ2ZXI6IHNlcnZlciB9KTtcbi8vIHZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuLy8gdmFyIGFwcCA9IGV4cHJlc3MoKTtcbi8vIHZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwO1xuXG4vLyBhcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvcHVibGljJykpO1xuXG4vLyBhcHAudXNlKGZ1bmN0aW9uIChyZXEsIHJlcykge1xuLy8gICByZXMuc2VuZCh7IG1zZzogXCJoZWxsb1wiIH0pO1xuLy8gfSk7XG5cbi8vIHdzcy5vbignY29ubmVjdGlvbicsIGZ1bmN0aW9uIGNvbm5lY3Rpb24od3MpIHtcbi8vICAgdmFyIGxvY2F0aW9uID0gdXJsLnBhcnNlKHdzLnVwZ3JhZGVSZXEudXJsLCB0cnVlKTtcbi8vICAgLy8geW91IG1pZ2h0IHVzZSBsb2NhdGlvbi5xdWVyeS5hY2Nlc3NfdG9rZW4gdG8gYXV0aGVudGljYXRlIG9yIHNoYXJlIHNlc3Npb25zXG4vLyAgIC8vIG9yIHdzLnVwZ3JhZGVSZXEuaGVhZGVycy5jb29raWUgKHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjM5NTIyMC8xNTEzMTIpXG5cbi8vICAgdmFyIHR1cm4gPSAwO1xuLy8gICB2YXIgYm9hcmRTdGF0ZSA9IHtcbi8vICAgICAnYSc6IFtudWxsLCBudWxsLCBudWxsXSxcbi8vICAgICAnYic6IFtudWxsLCBudWxsLCBudWxsXSxcbi8vICAgICAnYyc6IFtudWxsLCBudWxsLCBudWxsXVxuLy8gICB9O1xuLy8gICB2YXIgY2hlY2tGb3JXaW5uZXIgPSBmdW5jdGlvbih0b2tlbikge1xuLy8gICAgIGNoZWNrUm93cyh0b2tlbik7XG4vLyAgICAgY2hlY2tDb2xzKHRva2VuKTtcbi8vICAgICBjaGVja0RpYWcodG9rZW4pO1xuLy8gICB9O1xuXG4vLyAgIHZhciBjaGVja1Jvd3MgPSBmdW5jdGlvbih0b2tlbikge1xuLy8gICAgIGZvciAodmFyIHJvdyBpbiBib2FyZFN0YXRlKSB7XG4vLyAgICAgICB2YXIgY291bnQgPSAwO1xuLy8gICAgICAgYm9hcmRTdGF0ZVtyb3ddLmV2ZXJ5KGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuLy8gICAgICAgICBpZiAodmFsdWUgPT09IHRva2VuKSB7XG4vLyAgICAgICAgICAgaWYgKGNvdW50ID09PSAyKSB7XG4vLyAgICAgICAgICAgICB3cy5zZW5kKCd3aW5uZXInLCB0b2tlbik7XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGNvdW50Kys7XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICAgIH0pO1xuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICB2YXIgY2hlY2tDb2xzID0gZnVuY3Rpb24odG9rZW4pIHtcbi8vICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuLy8gICAgICAgaWYgKGJvYXJkU3RhdGUuYVtpXSAhPT0gbnVsbCkge1xuLy8gICAgICAgICBpZiAoYm9hcmRTdGF0ZS5hW2ldID09PSBib2FyZFN0YXRlLmJbaV0gJiYgYm9hcmRTdGF0ZS5iW2ldID09PSBib2FyZFN0YXRlLmNbaV0pIHtcbi8vICAgICAgICAgICB3cy5zZW5kKCd3aW5uZXInLCB0b2tlbik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgdmFyIGNoZWNrRGlhZyA9IGZ1bmN0aW9uKHRva2VuKSB7XG4vLyAgICAgaWYgKGJvYXJkU3RhdGUuYVswXSkge1xuLy8gICAgICAgaWYgKGJvYXJkU3RhdGUuYVswXSA9PT0gYm9hcmRTdGF0ZS5iWzFdICYmIGJvYXJkU3RhdGUuYlsxXSA9PT0gYm9hcmRTdGF0ZS5jWzJdKSB7XG4vLyAgICAgICAgIHdzLnNlbmQoJ3dpbm5lcicsIHRva2VuKTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgaWYgKGJvYXJkU3RhdGUuYVsyXSkge1xuLy8gICAgICAgaWYgKGJvYXJkU3RhdGUuYVsyXSA9PT0gYm9hcmRTdGF0ZS5iWzFdICYmIGJvYXJkU3RhdGUuYlsxXSA9PT0gYm9hcmRTdGF0ZS5jWzBdKSB7XG4vLyAgICAgICAgIHdzLnNlbmQoJ3dpbm5lcicsIHRva2VuKTtcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgd3Mub24oJ3R1cm5TdGFydCcsIGZ1bmN0aW9uKG1vdmUpIHtcbi8vICAgICB0dXJuKys7XG4vLyAgICAgdmFyIHRva2VuID0gKHR1cm4lMiA9PT0gMSkgPyAnWCc6J08nO1xuLy8gICAgIGJvYXJkU3RhdGVbbW92ZS5yb3ddW21vdmUuY29sXSA9IHRva2VuO1xuLy8gICAgIGlmICh0dXJuID49IDUpIHtcbi8vICAgICAgIGNoZWNrRm9yV2lubmVyKHRva2VuKTtcbi8vICAgICB9XG4vLyAgICAgd3Muc2VuZCgndHVybkZpbmlzaCcsIHsndG9rZW4nOiB0b2tlbiwgJ3Jvdyc6IG1vdmUucm93LCAnY29sJzogbW92ZS5jb2x9KTtcbi8vICAgfSk7XG5cbi8vIH0pO1xuXG4vLyBzZXJ2ZXIub24oJ3JlcXVlc3QnLCBhcHApO1xuLy8gc2VydmVyLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdMaXN0ZW5pbmcgb24gJyArIHNlcnZlci5hZGRyZXNzKCkucG9ydCkgfSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==