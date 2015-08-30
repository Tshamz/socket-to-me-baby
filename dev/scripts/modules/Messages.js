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
