angular.module('myApp.controllers')

    .controller('BooksController', function($scope, BookService) {
        BookService.all(function(books) {
            $scope.books = books;
            $scope.$apply();
        });

        $scope.clearFilter = function() {
            $scope.searchString = '';
        };
    })

    .controller('BookDetailController', function($scope, $rootScope, $stateParams, BookService) {
        var fontClasses = {1: 'xsmall', 2: 'small', 3: 'normal', 4: 'large', 5: 'xlarge'};

        $scope.appliedClass = fontClasses[$rootScope.bookZoom];

        BookService.get($stateParams.bookId, function(book) {
            $scope.book = book;
            $scope.$apply();
        });
        //$scope.book = BookService.get($stateParams.bookId);

        $scope.zoomInText = function() {
            if ($rootScope.bookZoom > 1) {
                $rootScope.bookZoom -= 1;
                $scope.appliedClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };

        $scope.zoomOutText = function() {
            if ($rootScope.bookZoom < 5) {
                $rootScope.bookZoom += 1;
                $scope.appliedClass = fontClasses[$rootScope.bookZoom];
                $scope.$broadcast('scroll.resize');
            }
        };
    })

    .controller('BookReadController', function($scope, $stateParams, BookService) {
        BookService.get($stateParams.bookId, function(book) {
            $scope.book = book;
            $scope.$apply();
        });

    })
;
