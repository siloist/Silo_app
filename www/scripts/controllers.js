angular.module('silo.controllers', [])

    .controller('AppController', function($scope, $window, AppService) {
        $scope.appversion = AppService.appversion();

        $scope.closeSideMenu = function() {
            $scope.sideMenuController.close();
        };

        $scope.menuButtons = [
            {
                type: 'button-dark',
                content: '<i class="icon ion-navicon"></i>',
                tap: function(e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];
        $scope.backButtons = [
            {
                type: 'button-dark',
                content: '<i class="icon ion-ios7-arrow-back"></i>',
                tap: function(e) {
                    $window.history.back();
                }
            }
        ];

    })

    .controller('HomeController', function($scope, AppService, $translate) {
        $scope.randomQuote = AppService.randomQuote();
        $scope.newQuote = function() {
            $scope.randomQuote = AppService.randomQuote();
        };
        $scope.curlang = $translate.use();
    })

    .controller('InfoController', function($scope, BookService, $translate) {
        $scope.titolo = $translate.instant('BOOKS');
        $scope.curlang = $translate.use();
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
    })

    .controller('LocationController', function($scope, CordovaService) {
        CordovaService.ready.then(function() {
            // Cordova is ready
        });
    });
