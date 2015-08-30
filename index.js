var http = require('http');
var url = require('url');
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcbnZhciBXZWJTb2NrZXRTZXJ2ZXIgPSByZXF1aXJlKCd3cycpLlNlcnZlcjtcbnZhciB3c3MgPSBuZXcgV2ViU29ja2V0U2VydmVyKHsgc2VydmVyOiBzZXJ2ZXIgfSk7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG52YXIgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgNTAwMDtcblxuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJyk7XG5hcHAuc2V0KCd2aWV3cycsIF9fZGlybmFtZSArICcvdmlld3MnKTtcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9wdWJsaWMnKSk7XG5hcHAuZ2V0KCcvJywgZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgcmVzcG9uc2UucmVuZGVyKCdwYWdlcy9pbmRleCcpO1xufSk7XG5cbnZhciBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihhcHApO1xuc2VydmVyLmxpc3Rlbihwb3J0KTtcbmNvbnNvbGUubG9nKFwiaHR0cCBzZXJ2ZXIgbGlzdGVuaW5nIG9uICVkXCIsIHBvcnQpO1xuXG52YXIgd3NzID0gbmV3IFdlYlNvY2tldFNlcnZlcih7IHNlcnZlcjogc2VydmVyIH0pO1xuY29uc29sZS5sb2coXCJ3ZWJzb2NrZXQgc2VydmVyIGNyZWF0ZWRcIik7XG5cbndzcy5vbignY29ubmVjdGlvbicsIGZ1bmN0aW9uKHdzKSB7XG4gIGNvbnNvbGUuaW5mbyhcIndlYnNvY2tldCBjb25uZWN0aW9uIG9wZW5cIik7XG5cbiAgdmFyIGxvY2F0aW9uID0gdXJsLnBhcnNlKHdzLnVwZ3JhZGVSZXEudXJsLCB0cnVlKTtcbiAgLy8geW91IG1pZ2h0IHVzZSBsb2NhdGlvbi5xdWVyeS5hY2Nlc3NfdG9rZW4gdG8gYXV0aGVudGljYXRlIG9yIHNoYXJlIHNlc3Npb25zXG4gIC8vIG9yIHdzLnVwZ3JhZGVSZXEuaGVhZGVycy5jb29raWUgKHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjM5NTIyMC8xNTEzMTIpXG5cbiAgdmFyIHR1cm4gPSAwO1xuICB2YXIgYm9hcmRTdGF0ZSA9IHtcbiAgICAnYSc6IFtudWxsLCBudWxsLCBudWxsXSxcbiAgICAnYic6IFtudWxsLCBudWxsLCBudWxsXSxcbiAgICAnYyc6IFtudWxsLCBudWxsLCBudWxsXVxuICB9O1xuICB2YXIgY2hlY2tGb3JXaW5uZXIgPSBmdW5jdGlvbih0b2tlbikge1xuICAgIGNoZWNrUm93cyh0b2tlbik7XG4gICAgY2hlY2tDb2xzKHRva2VuKTtcbiAgICBjaGVja0RpYWcodG9rZW4pO1xuICB9O1xuXG4gIHZhciBjaGVja1Jvd3MgPSBmdW5jdGlvbih0b2tlbikge1xuICAgIGZvciAodmFyIHJvdyBpbiBib2FyZFN0YXRlKSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgYm9hcmRTdGF0ZVtyb3ddLmV2ZXJ5KGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHRva2VuKSB7XG4gICAgICAgICAgaWYgKGNvdW50ID09PSAyKSB7XG4gICAgICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjaGVja0NvbHMgPSBmdW5jdGlvbih0b2tlbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBpZiAoYm9hcmRTdGF0ZS5hW2ldICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChib2FyZFN0YXRlLmFbaV0gPT09IGJvYXJkU3RhdGUuYltpXSAmJiBib2FyZFN0YXRlLmJbaV0gPT09IGJvYXJkU3RhdGUuY1tpXSkge1xuICAgICAgICAgIHdzLnNlbmQodG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBjaGVja0RpYWcgPSBmdW5jdGlvbih0b2tlbikge1xuICAgIGlmIChib2FyZFN0YXRlLmFbMF0pIHtcbiAgICAgIGlmIChib2FyZFN0YXRlLmFbMF0gPT09IGJvYXJkU3RhdGUuYlsxXSAmJiBib2FyZFN0YXRlLmJbMV0gPT09IGJvYXJkU3RhdGUuY1syXSkge1xuICAgICAgICB3cy5zZW5kKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJvYXJkU3RhdGUuYVsyXSkge1xuICAgICAgaWYgKGJvYXJkU3RhdGUuYVsyXSA9PT0gYm9hcmRTdGF0ZS5iWzFdICYmIGJvYXJkU3RhdGUuYlsxXSA9PT0gYm9hcmRTdGF0ZS5jWzBdKSB7XG4gICAgICAgIHdzLnNlbmQodG9rZW4pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3cy5vbignbWVzc2FnZScsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcblxuICAgIHR1cm4rKztcbiAgICB2YXIgdG9rZW4gPSAodHVybiUyID09PSAxKSA/ICdYJzonTyc7XG4gICAgYm9hcmRTdGF0ZVttb3ZlLnJvd11bbW92ZS5jb2xdID0gdG9rZW47XG4gICAgaWYgKHR1cm4gPj0gNSkge1xuICAgICAgY2hlY2tGb3JXaW5uZXIodG9rZW4pO1xuICAgIH1cbiAgICB3cy5zZW5kKHsndG9rZW4nOiB0b2tlbiwgJ3Jvdyc6IG1vdmUucm93LCAnY29sJzogbW92ZS5jb2x9KTtcbiAgfSk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9