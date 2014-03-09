angular.module('myApp.controllers')

    .controller('BooksController', function($scope, BookService) {
        BookService.all(function(books) {
            $scope.books = books;
            //$scope.$apply();
        });

        $scope.clearFilter = function() {
            $scope.searchString = '';
        };
    })

    .controller('BookDetailController', function($scope, $rootScope, $stateParams, BookService) {
        $rootScope.allowRightMenu = true;

        $scope.book = BookService.get($stateParams.bookId);

//        BookService.get($stateParams.bookId, function(book) {
//            $scope.book = book;
//            $scope.$apply();
//        });

        var fontClasses = {1: 'xsmall', 2: 'small', 3: 'normal', 4: 'large', 5: 'xlarge'};

        $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
        if ($rootScope.bookDarkMode) {
            $scope.stylemodeClass = 'dark-content';
        }

        $scope.changeStyle = function() {
            $rootScope.bookDarkMode = !$rootScope.bookDarkMode;
            // console.log('change style' + $rootScope.bookDarkMode);
            if ($rootScope.bookDarkMode) {
                $scope.stylemodeClass = 'dark-content';
            } else {
                $scope.stylemodeClass = '';
            }

        };

        $scope.zoomInText = function() {
            if ($rootScope.bookZoom > 1) {
                $rootScope.bookZoom -= 1;
                $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };

        $scope.zoomOutText = function() {
            if ($rootScope.bookZoom < 5) {
                $rootScope.bookZoom += 1;
                $scope.textsizeClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };

        $scope.fullscreen = function() {
            alert('not yet ;)');
        };

        $scope.chapters = function() {
            $scope.sideMenuController.toggleRight();
        };
    })
;
