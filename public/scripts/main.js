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

(function(Messages, $, undefined) {

  // Private
  var $body = $('body');


  var bindUIActions = function() {
    // $body.click(function() {
    //   $body.hide();
    // });
  };

  // Public
  Messages.init = function() {
    bindUIActions();
  };

}(window.Messages = window.Messages || {}, jQuery));

(function() {

  Gameplay.init();
  Messages.init();

}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVwbGF5LmpzIiwiTWVzc2FnZXMuanMiLCJpbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihHYW1lcGxheSwgJCwgdW5kZWZpbmVkKSB7XG5cbiAgLy8gUHJpdmF0ZVxuICB2YXIgaG9zdCA9IGxvY2F0aW9uLm9yaWdpbi5yZXBsYWNlKC9eaHR0cC8sICd3cycpO1xuICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KGhvc3QpO1xuICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgY29uc29sZS5sb2coZXZlbnQuZGF0YSk7XG4gICAgLy8gJCgnLmdhbWVib2FyZCBnIycrIGV2ZW50LmRhdGEucm93ICsgZXZlbnQuZGF0YS5jb2wpLmZpbmQoJ3VzZScpWzBdLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3hsaW5rOmhyZWYnLCAnI3BsYXllci10b2tlbi0nICsgZXZlbnQuZGF0YS50b2tlbik7XG4gICAgLy8gJCgnLmdhbWVib2FyZCBnJykub2ZmKCdjbGljaycpO1xuICAgIC8vICQoJzxkaXYgLz4nLCB7dGV4dDogdG9rZW4gKyAnIHdpbnMhJywgJ2NsYXNzJzogJ3dpbm5lci13aW5uZXItd2hhdHMtZm9yLWRpbm5lcid9KS5wcmVwZW5kVG8oJy5nYW1lYm9hcmQnKTtcbiAgfTtcblxuICB2YXIgYmluZFVJQWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICQoJy5nYW1lYm9hcmQgZycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5vZmYoJ2NsaWNrJyk7XG4gICAgICB2YXIgcm93ID0gJCh0aGlzKS5hdHRyKCdpZCcpWzBdO1xuICAgICAgdmFyIGNvbCA9ICQodGhpcykuYXR0cignaWQnKVsxXTtcbiAgICAgIHdzLnNlbmQoeydyb3cnOiByb3csICdjb2wnOiBjb2x9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyB3cy5vbigndHVybkZpbmlzaCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gICAkKCcuZ2FtZWJvYXJkIGcjJysgZGF0YS5yb3cgKyBkYXRhLmNvbCkuZmluZCgndXNlJylbMF0uc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCAneGxpbms6aHJlZicsICcjcGxheWVyLXRva2VuLScgKyBkYXRhLnRva2VuKTtcbiAgLy8gfSk7XG5cbiAgLy8gd3Mub24oJ3dpbm5lcicsIGZ1bmN0aW9uKHRva2VuKSB7XG4gIC8vICAgJCgnLmdhbWVib2FyZCBnJykub2ZmKCdjbGljaycpO1xuICAvLyAgICQoJzxkaXYgLz4nLCB7dGV4dDogdG9rZW4gKyAnIHdpbnMhJywgJ2NsYXNzJzogJ3dpbm5lci13aW5uZXItd2hhdHMtZm9yLWRpbm5lcid9KS5wcmVwZW5kVG8oJy5nYW1lYm9hcmQnKTtcbiAgLy8gfSk7XG5cbiAgLy8gUHVibGljXG4gIEdhbWVwbGF5LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBiaW5kVUlBY3Rpb25zKCk7XG4gIH07XG5cbn0od2luZG93LkdhbWVwbGF5ID0gd2luZG93LkdhbWVwbGF5IHx8IHt9LCBqUXVlcnkpKTtcbiIsIihmdW5jdGlvbihNZXNzYWdlcywgJCwgdW5kZWZpbmVkKSB7XG5cbiAgLy8gUHJpdmF0ZVxuICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG5cblxuICB2YXIgYmluZFVJQWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICRib2R5LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIC8vICAgJGJvZHkuaGlkZSgpO1xuICAgIC8vIH0pO1xuICB9O1xuXG4gIC8vIFB1YmxpY1xuICBNZXNzYWdlcy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYmluZFVJQWN0aW9ucygpO1xuICB9O1xuXG59KHdpbmRvdy5NZXNzYWdlcyA9IHdpbmRvdy5NZXNzYWdlcyB8fCB7fSwgalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgR2FtZXBsYXkuaW5pdCgpO1xuICBNZXNzYWdlcy5pbml0KCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=