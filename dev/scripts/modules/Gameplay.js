(function(Gameplay, $, undefined) {

  var bindUIActions = function() {
    $('.gameboard g').on('click', function() {
      var col = $(this).attr('col');
      var row = $(this).attr('row');
      Messages.sendMessage({'row': row, 'col': col});
    });
  };

  // Public
  Gameplay.logMove = function(move) {
    $('.gameboard g[row="'+move.row+'"][col="'+move.col+'"]').find('use')[0].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#player-token-' + move.token);
  };

  Gameplay.gameOver = function(token) {
    $('<div />', {text: token + ' wins!', 'class': 'winner-winner-whats-for-dinner'}).prependTo('.gameboard');
  };

  Gameplay.init = function() {
    bindUIActions();
  };

}(window.Gameplay = window.Gameplay || {}, jQuery));
