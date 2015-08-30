var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var url = require('url');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.render('pages/index');
});


var server = http.createServer(app);
var port = 4080;
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFdlYlNvY2tldFNlcnZlciA9IHJlcXVpcmUoJ3dzJykuU2VydmVyO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblxudmFyIGFwcCA9IGV4cHJlc3MoKTtcbmFwcC5zZXQoJ3BvcnQnLCAocHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKSk7XG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdlanMnKTtcbmFwcC5zZXQoJ3ZpZXdzJywgX19kaXJuYW1lICsgJy92aWV3cycpO1xuYXBwLnVzZShleHByZXNzLnN0YXRpYyhfX2Rpcm5hbWUgKyAnL3B1YmxpYycpKTtcbmFwcC5nZXQoJy8nLCBmdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSkge1xuICByZXNwb25zZS5yZW5kZXIoJ3BhZ2VzL2luZGV4Jyk7XG59KTtcblxuXG52YXIgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcbnZhciBwb3J0ID0gNDA4MDtcbnNlcnZlci5vbigncmVxdWVzdCcsIGFwcCk7XG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coXCJodHRwIHNlcnZlciBsaXN0ZW5pbmcgb24gJWRcIiwgcG9ydCk7XG5cbnZhciB3c3MgPSBuZXcgV2ViU29ja2V0U2VydmVyKHsgc2VydmVyOiBzZXJ2ZXIgfSk7XG53c3Mub24oJ2Nvbm5lY3Rpb24nLCBmdW5jdGlvbih3cykge1xuICBjb25zb2xlLmluZm8oXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBvcGVuXCIpO1xuXG4gIHZhciBsb2NhdGlvbiA9IHVybC5wYXJzZSh3cy51cGdyYWRlUmVxLnVybCwgdHJ1ZSk7XG4gIC8vIHlvdSBtaWdodCB1c2UgbG9jYXRpb24ucXVlcnkuYWNjZXNzX3Rva2VuIHRvIGF1dGhlbnRpY2F0ZSBvciBzaGFyZSBzZXNzaW9uc1xuICAvLyBvciB3cy51cGdyYWRlUmVxLmhlYWRlcnMuY29va2llIChzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTYzOTUyMjAvMTUxMzEyKVxuXG4gIHZhciB0dXJuID0gMDtcbiAgdmFyIGJvYXJkU3RhdGUgPSB7XG4gICAgJ2EnOiBbbnVsbCwgbnVsbCwgbnVsbF0sXG4gICAgJ2InOiBbbnVsbCwgbnVsbCwgbnVsbF0sXG4gICAgJ2MnOiBbbnVsbCwgbnVsbCwgbnVsbF1cbiAgfTtcbiAgdmFyIGNoZWNrRm9yV2lubmVyID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBjaGVja1Jvd3ModG9rZW4pO1xuICAgIGNoZWNrQ29scyh0b2tlbik7XG4gICAgY2hlY2tEaWFnKHRva2VuKTtcbiAgfTtcblxuICB2YXIgY2hlY2tSb3dzID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBmb3IgKHZhciByb3cgaW4gYm9hcmRTdGF0ZSkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgIGJvYXJkU3RhdGVbcm93XS5ldmVyeShmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0b2tlbikge1xuICAgICAgICAgIGlmIChjb3VudCA9PT0gMikge1xuICAgICAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY2hlY2tDb2xzID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgaWYgKGJvYXJkU3RhdGUuYVtpXSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoYm9hcmRTdGF0ZS5hW2ldID09PSBib2FyZFN0YXRlLmJbaV0gJiYgYm9hcmRTdGF0ZS5iW2ldID09PSBib2FyZFN0YXRlLmNbaV0pIHtcbiAgICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY2hlY2tEaWFnID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdKSB7XG4gICAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdID09PSBib2FyZFN0YXRlLmJbMV0gJiYgYm9hcmRTdGF0ZS5iWzFdID09PSBib2FyZFN0YXRlLmNbMl0pIHtcbiAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChib2FyZFN0YXRlLmFbMl0pIHtcbiAgICAgIGlmIChib2FyZFN0YXRlLmFbMl0gPT09IGJvYXJkU3RhdGUuYlsxXSAmJiBib2FyZFN0YXRlLmJbMV0gPT09IGJvYXJkU3RhdGUuY1swXSkge1xuICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd3Mub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG5cbiAgICB0dXJuKys7XG4gICAgdmFyIHRva2VuID0gKHR1cm4lMiA9PT0gMSkgPyAnWCc6J08nO1xuICAgIGJvYXJkU3RhdGVbbW92ZS5yb3ddW21vdmUuY29sXSA9IHRva2VuO1xuICAgIGlmICh0dXJuID49IDUpIHtcbiAgICAgIGNoZWNrRm9yV2lubmVyKHRva2VuKTtcbiAgICB9XG4gICAgd3Muc2VuZCh7J3Rva2VuJzogdG9rZW4sICdyb3cnOiBtb3ZlLnJvdywgJ2NvbCc6IG1vdmUuY29sfSk7XG4gIH0pO1xufSk7XG5cbmNvbnNvbGUubG9nKFwid2Vic29ja2V0IHNlcnZlciBjcmVhdGVkXCIpO1xuXG5cbi8vIHZhciBzZXJ2ZXIgPSByZXF1aXJlKCdodHRwJykuY3JlYXRlU2VydmVyKCk7XG4vLyB2YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG4vLyB2YXIgV2ViU29ja2V0U2VydmVyID0gcmVxdWlyZSgnd3MnKS5TZXJ2ZXI7XG4vLyB2YXIgd3NzID0gbmV3IFdlYlNvY2tldFNlcnZlcih7IHNlcnZlcjogc2VydmVyIH0pO1xuLy8gdmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG4vLyB2YXIgYXBwID0gZXhwcmVzcygpO1xuLy8gdmFyIHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDUwMDA7XG5cbi8vIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9wdWJsaWMnKSk7XG5cbi8vIGFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4vLyAgIHJlcy5zZW5kKHsgbXNnOiBcImhlbGxvXCIgfSk7XG4vLyB9KTtcblxuLy8gd3NzLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gY29ubmVjdGlvbih3cykge1xuLy8gICB2YXIgbG9jYXRpb24gPSB1cmwucGFyc2Uod3MudXBncmFkZVJlcS51cmwsIHRydWUpO1xuLy8gICAvLyB5b3UgbWlnaHQgdXNlIGxvY2F0aW9uLnF1ZXJ5LmFjY2Vzc190b2tlbiB0byBhdXRoZW50aWNhdGUgb3Igc2hhcmUgc2Vzc2lvbnNcbi8vICAgLy8gb3Igd3MudXBncmFkZVJlcS5oZWFkZXJzLmNvb2tpZSAoc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2Mzk1MjIwLzE1MTMxMilcblxuLy8gICB2YXIgdHVybiA9IDA7XG4vLyAgIHZhciBib2FyZFN0YXRlID0ge1xuLy8gICAgICdhJzogW251bGwsIG51bGwsIG51bGxdLFxuLy8gICAgICdiJzogW251bGwsIG51bGwsIG51bGxdLFxuLy8gICAgICdjJzogW251bGwsIG51bGwsIG51bGxdXG4vLyAgIH07XG4vLyAgIHZhciBjaGVja0Zvcldpbm5lciA9IGZ1bmN0aW9uKHRva2VuKSB7XG4vLyAgICAgY2hlY2tSb3dzKHRva2VuKTtcbi8vICAgICBjaGVja0NvbHModG9rZW4pO1xuLy8gICAgIGNoZWNrRGlhZyh0b2tlbik7XG4vLyAgIH07XG5cbi8vICAgdmFyIGNoZWNrUm93cyA9IGZ1bmN0aW9uKHRva2VuKSB7XG4vLyAgICAgZm9yICh2YXIgcm93IGluIGJvYXJkU3RhdGUpIHtcbi8vICAgICAgIHZhciBjb3VudCA9IDA7XG4vLyAgICAgICBib2FyZFN0YXRlW3Jvd10uZXZlcnkoZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4vLyAgICAgICAgIGlmICh2YWx1ZSA9PT0gdG9rZW4pIHtcbi8vICAgICAgICAgICBpZiAoY291bnQgPT09IDIpIHtcbi8vICAgICAgICAgICAgIHdzLnNlbmQoJ3dpbm5lcicsIHRva2VuKTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgY291bnQrKztcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgfSk7XG4vLyAgICAgfVxuLy8gICB9O1xuXG4vLyAgIHZhciBjaGVja0NvbHMgPSBmdW5jdGlvbih0b2tlbikge1xuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4vLyAgICAgICBpZiAoYm9hcmRTdGF0ZS5hW2ldICE9PSBudWxsKSB7XG4vLyAgICAgICAgIGlmIChib2FyZFN0YXRlLmFbaV0gPT09IGJvYXJkU3RhdGUuYltpXSAmJiBib2FyZFN0YXRlLmJbaV0gPT09IGJvYXJkU3RhdGUuY1tpXSkge1xuLy8gICAgICAgICAgIHdzLnNlbmQoJ3dpbm5lcicsIHRva2VuKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICB2YXIgY2hlY2tEaWFnID0gZnVuY3Rpb24odG9rZW4pIHtcbi8vICAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdKSB7XG4vLyAgICAgICBpZiAoYm9hcmRTdGF0ZS5hWzBdID09PSBib2FyZFN0YXRlLmJbMV0gJiYgYm9hcmRTdGF0ZS5iWzFdID09PSBib2FyZFN0YXRlLmNbMl0pIHtcbi8vICAgICAgICAgd3Muc2VuZCgnd2lubmVyJywgdG9rZW4pO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBpZiAoYm9hcmRTdGF0ZS5hWzJdKSB7XG4vLyAgICAgICBpZiAoYm9hcmRTdGF0ZS5hWzJdID09PSBib2FyZFN0YXRlLmJbMV0gJiYgYm9hcmRTdGF0ZS5iWzFdID09PSBib2FyZFN0YXRlLmNbMF0pIHtcbi8vICAgICAgICAgd3Muc2VuZCgnd2lubmVyJywgdG9rZW4pO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICB3cy5vbigndHVyblN0YXJ0JywgZnVuY3Rpb24obW92ZSkge1xuLy8gICAgIHR1cm4rKztcbi8vICAgICB2YXIgdG9rZW4gPSAodHVybiUyID09PSAxKSA/ICdYJzonTyc7XG4vLyAgICAgYm9hcmRTdGF0ZVttb3ZlLnJvd11bbW92ZS5jb2xdID0gdG9rZW47XG4vLyAgICAgaWYgKHR1cm4gPj0gNSkge1xuLy8gICAgICAgY2hlY2tGb3JXaW5uZXIodG9rZW4pO1xuLy8gICAgIH1cbi8vICAgICB3cy5zZW5kKCd0dXJuRmluaXNoJywgeyd0b2tlbic6IHRva2VuLCAncm93JzogbW92ZS5yb3csICdjb2wnOiBtb3ZlLmNvbH0pO1xuLy8gICB9KTtcblxuLy8gfSk7XG5cbi8vIHNlcnZlci5vbigncmVxdWVzdCcsIGFwcCk7XG4vLyBzZXJ2ZXIubGlzdGVuKHBvcnQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiAnICsgc2VydmVyLmFkZHJlc3MoKS5wb3J0KSB9KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9