angular.module('silo.controllers', [])

    .controller('AppController', function($scope, AppService) {
        $scope.appversion = AppService.appversion();
    })

    .controller('HomeController', function($scope, AppService) {
        $scope.randomQuote = AppService.randomQuote();
        $scope.newQuote = function() {
            $scope.randomQuote = AppService.randomQuote();
        };
    })

    .controller('InfoController', function($scope, BookService, $translate) {
        $scope.titolo = $translate.instant('BOOKS');
    })

    .controller('LangController', function($scope, $translate) {
        $scope.changeLanguage = function(key) {
            $translate.use(key);
        };
    })

    .controller('PlaceIndexController', function($scope, PlaceService) {
        PlaceService.getAllPlaces(function(data) {
            $scope.places = data;
        });

    })

    .controller('PlaceDetailController', function($scope, $stateParams, PlaceService) {
        $scope.place = PlaceService.get($stateParams.placeId);
    })

    .controller('BookIndexController', function($scope, BookService) {
        BookService.all(function(books) {
            $scope.books = books;
            $scope.$apply();
        });

    })

    .controller('BookDetailController', function($scope, $stateParams, BookService) {
        BookService.get($stateParams.bookId, function(book) {
            $scope.book = book;
            $scope.$apply();
        });

        //$scope.book = BookService.get($stateParams.bookId);
    })

    .controller('BookReadController', function($scope, $stateParams, BookService) {
        BookService.get($stateParams.bookId, function(book) {
            $scope.book = book;
            $scope.$apply();
        });

    })

    .controller('MediaIndexController', function($scope, MediaService) {
        $scope.medias = MediaService.all();
    })

    .controller('MediaDetailController', function($scope, $stateParams, MediaService) {
        $scope.media = MediaService.get($stateParams.mediaId);
    });
