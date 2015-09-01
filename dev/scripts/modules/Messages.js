(function(Messages, $, undefined) {

  // Private
  var host = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(host);

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    Gameplay[parsedMessage.eventType](parsedMessage);
  };

  // Public
  Messages.sendMessage = function(data) {
    var serializedData = JSON.stringify(data);
    ws.send(serializedData);
  };

}(window.Messages = window.Messages || {}, jQuery));
