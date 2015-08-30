(function(Gameplay, $, undefined) {

  // Private
  var host = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(host);
  ws.onmessage = function (event) {
    console.log(event);
    console.log(event.data);
    // $('.gameboard g#'+ event.data.row + event.data.col).find('use')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#player-token-' + event.data.token);
    // $('.gameboard g').off('click');
    // $('<div />', {text: token + ' wins!', 'class': 'winner-winner-whats-for-dinner'}).prependTo('.gameboard');
  };

  var bindUIActions = function() {
    $('.gameboard g').on('click', function() {
      $(this).off('click');
      var row = $(this).attr('id')[0];
      var col = $(this).attr('id')[1];
      ws.send({'row': row, 'col': col});
    });
  };

  // ws.on('turnFinish', function(data) {
  //   $('.gameboard g#'+ data.row + data.col).find('use')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#player-token-' + data.token);
  // });

  // ws.on('winner', function(token) {
  //   $('.gameboard g').off('click');
  //   $('<div />', {text: token + ' wins!', 'class': 'winner-winner-whats-for-dinner'}).prependTo('.gameboard');
  // });

  // Public
  Gameplay.init = function() {
    bindUIActions();
  };

}(window.Gameplay = window.Gameplay || {}, jQuery));
