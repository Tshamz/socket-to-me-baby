var WebSocketServer = require("ws").Server;
var url = require('url');
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', function(request, response) {
  response.render('pages/index');
});

var server = http.createServer(app);
server.listen(port);
console.log("http server listening on %d", port);

var wss = new WebSocketServer({ server: server });
console.log("websocket server created");

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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFdlYlNvY2tldFNlcnZlciA9IHJlcXVpcmUoXCJ3c1wiKS5TZXJ2ZXI7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcbnZhciBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvcHVibGljJykpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJyk7XG5hcHAuc2V0KCd2aWV3cycsIF9fZGlybmFtZSArICcvdmlld3MnKTtcbmFwcC5nZXQoJy8nLCBmdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSkge1xuICByZXNwb25zZS5yZW5kZXIoJ3BhZ2VzL2luZGV4Jyk7XG59KTtcblxudmFyIHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coXCJodHRwIHNlcnZlciBsaXN0ZW5pbmcgb24gJWRcIiwgcG9ydCk7XG5cbnZhciB3c3MgPSBuZXcgV2ViU29ja2V0U2VydmVyKHsgc2VydmVyOiBzZXJ2ZXIgfSk7XG5jb25zb2xlLmxvZyhcIndlYnNvY2tldCBzZXJ2ZXIgY3JlYXRlZFwiKTtcblxud3NzLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24od3MpIHtcbiAgY29uc29sZS5pbmZvKFwid2Vic29ja2V0IGNvbm5lY3Rpb24gb3BlblwiKTtcblxuICB2YXIgbG9jYXRpb24gPSB1cmwucGFyc2Uod3MudXBncmFkZVJlcS51cmwsIHRydWUpO1xuICAvLyB5b3UgbWlnaHQgdXNlIGxvY2F0aW9uLnF1ZXJ5LmFjY2Vzc190b2tlbiB0byBhdXRoZW50aWNhdGUgb3Igc2hhcmUgc2Vzc2lvbnNcbiAgLy8gb3Igd3MudXBncmFkZVJlcS5oZWFkZXJzLmNvb2tpZSAoc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2Mzk1MjIwLzE1MTMxMilcblxuICB2YXIgdHVybiA9IDA7XG4gIHZhciBib2FyZFN0YXRlID0ge1xuICAgICdhJzogW251bGwsIG51bGwsIG51bGxdLFxuICAgICdiJzogW251bGwsIG51bGwsIG51bGxdLFxuICAgICdjJzogW251bGwsIG51bGwsIG51bGxdXG4gIH07XG4gIHZhciBjaGVja0Zvcldpbm5lciA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgY2hlY2tSb3dzKHRva2VuKTtcbiAgICBjaGVja0NvbHModG9rZW4pO1xuICAgIGNoZWNrRGlhZyh0b2tlbik7XG4gIH07XG5cbiAgdmFyIGNoZWNrUm93cyA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgZm9yICh2YXIgcm93IGluIGJvYXJkU3RhdGUpIHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICBib2FyZFN0YXRlW3Jvd10uZXZlcnkoZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdG9rZW4pIHtcbiAgICAgICAgICBpZiAoY291bnQgPT09IDIpIHtcbiAgICAgICAgICAgIHdzLnNlbmQodG9rZW4pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoZWNrQ29scyA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGlmIChib2FyZFN0YXRlLmFbaV0gIT09IG51bGwpIHtcbiAgICAgICAgaWYgKGJvYXJkU3RhdGUuYVtpXSA9PT0gYm9hcmRTdGF0ZS5iW2ldICYmIGJvYXJkU3RhdGUuYltpXSA9PT0gYm9hcmRTdGF0ZS5jW2ldKSB7XG4gICAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoZWNrRGlhZyA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgaWYgKGJvYXJkU3RhdGUuYVswXSkge1xuICAgICAgaWYgKGJvYXJkU3RhdGUuYVswXSA9PT0gYm9hcmRTdGF0ZS5iWzFdICYmIGJvYXJkU3RhdGUuYlsxXSA9PT0gYm9hcmRTdGF0ZS5jWzJdKSB7XG4gICAgICAgIHdzLnNlbmQodG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYm9hcmRTdGF0ZS5hWzJdKSB7XG4gICAgICBpZiAoYm9hcmRTdGF0ZS5hWzJdID09PSBib2FyZFN0YXRlLmJbMV0gJiYgYm9hcmRTdGF0ZS5iWzFdID09PSBib2FyZFN0YXRlLmNbMF0pIHtcbiAgICAgICAgd3Muc2VuZCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHdzLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuXG4gICAgdHVybisrO1xuICAgIHZhciB0b2tlbiA9ICh0dXJuJTIgPT09IDEpID8gJ1gnOidPJztcbiAgICBib2FyZFN0YXRlW21vdmUucm93XVttb3ZlLmNvbF0gPSB0b2tlbjtcbiAgICBpZiAodHVybiA+PSA1KSB7XG4gICAgICBjaGVja0Zvcldpbm5lcih0b2tlbik7XG4gICAgfVxuICAgIHdzLnNlbmQoeyd0b2tlbic6IHRva2VuLCAncm93JzogbW92ZS5yb3csICdjb2wnOiBtb3ZlLmNvbH0pO1xuICB9KTtcbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=