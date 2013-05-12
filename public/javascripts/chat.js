angular.module('myApp', ['ui.keypress']);

angular.module('myApp').controller('ChatCtrl', ['$scope', function ($scope) {

  var socket = io.connect('http://localhost'),
      form = $('#registerForm');
      chatContainer = $('#chatContainer');

  socket.on('notify', function(m) {
    chatContainer.children().first().append('<p>' + m.message + '</p>');
  });

  $scope.register = function() {
    socket.emit('register', {username: $scope.username});
    form.hide();
    chatContainer.show();
  };

  $scope.sendMessage = function() {
    console.log('ok');
    socket.emit('message', {message: $scope.message});
    $scope.message = null;
  }
}]);
