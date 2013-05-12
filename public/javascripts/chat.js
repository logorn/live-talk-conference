angular.module('myApp', ['ui.keypress']);

angular.module('myApp').controller('ChatCtrl', ['$scope', function ($scope) {
  var socket = io.connect('http://localhost'),
    form = $('#registerForm');
    chatContainer = $('#chatContainer'),
    pdfViewer = $('#pdfViewer'),
    scale = 0.8,
    canvas = $('#the-canvas')[0],
    url = 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
    ctx = canvas.getContext('2d');
  PDFJS.disableWorker = true;

  socket.on('notify', function(m) {
    chatContainer.children().first().append('<p>' + m.message + '</p>');
  });

  socket.on('setPage', function(m) {
    $scope.pageNum = m.pageNum;
    $scope.renderPage($scope.pageNum);
  });

  $scope.register = function() {
    socket.emit('register', {username: $scope.username});
    form.hide();
    chatContainer.show();
    pdfViewer.show();

    PDFJS.getDocument(url).then(function getPdfHelloWorld(_pdfDoc) {
      $scope.pdfDoc = _pdfDoc;
      $scope.renderPage();
      $scope.numPages = _pdfDoc.numPages;
    });
  };

  $scope.pageNum = 1;

  $scope.sendMessage = function() {
    socket.emit('message', {message: $scope.message});
    $scope.message = '';
  }

  $scope.previousPage = function() {
    if ($scope.pageNum <= 1) {
      return ;
    }
    $scope.pageNum--;
    $scope.renderPage($scope.pageNum);
    socket.emit('setPage', {page: $scope.pageNum});
  }

  $scope.nextPage = function() {
    if ($scope.pageNum >= $scope.pdfDoc.numPages) {
      return ;
    }
    $scope.pageNum++;
    $scope.renderPage($scope.pageNum);
    socket.emit('setPage', {pageNum: $scope.pageNum});
  }

  $scope.renderPage = function () {
    // Using promise to fetch the page
    $scope.pdfDoc.getPage($scope.pageNum).then(function(page) {
      var viewport = page.getViewport(scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      page.render(renderContext);
    });
  }
}]);
