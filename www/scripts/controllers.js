angular.module('silo.controllers', [])

    .controller('AppController', function($scope, $window, AppService) {
        $scope.appversion = AppService.appversion();

        $scope.closeSideMenu = function() {
            $scope.sideMenuController.close();
        };

        $scope.menuButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-navicon"></i>',
                tap: function(e) {
                    $scope.sideMenuController.toggleLeft();
                }
            }
        ];
        $scope.backButtons = [
            {
                type: 'button-clear',
                content: '<i class="icon ion-ios7-arrow-back"></i>',
                tap: function(e) {
                    $window.history.back();
                }
            }
        ];

    })

    .controller('HomeController', function($scope, AppService, $rootScope, $translate) {
//        console.log($rootScope.isTablet);
        if (!$rootScope.isTablet) {
            $scope.sideMenuController.close();
        }
        $scope.randomQuote = AppService.randomQuote();
        $scope.newQuote = function() {
            $scope.randomQuote = AppService.randomQuote();
        };
        $scope.curlang = $translate.use();
    })

    .controller('InfoController', function($scope, BookService, $rootScope, $translate) {
        if (!$rootScope.isTablet) {
            $scope.sideMenuController.close();
        }
        $scope.titolo = $translate.instant('BOOKS');
        $scope.curlang = $translate.use();
    })

    .controller('LangController', function($scope, $translate) {
        $scope.changeLanguage = function(key) {
            $translate.use(key);
        };
    })

    .controller('PlaceIndexController', function($scope, $rootScope, PlaceService) {
        if (!$rootScope.isTablet) {
            $scope.sideMenuController.close();
        }
        PlaceService.getAllPlaces(function(data) {
            $scope.places = data;
        });

        $scope.clearFilter = function() {
            $scope.query = '';
        };
    })

    .controller('PlaceDetailController', function($scope, $stateParams, PlaceService, $ionicPlatform, $location) {
        $scope.place = PlaceService.get($stateParams.placeId);

        console.log("lat:" +  $scope.place.lat + " lon: " + $scope.place.lon);
        // init gps array
        $scope.whoiswhere = [];
        $scope.coordinates = { lat: $scope.place.lat, lon: $scope.place.lon };


        // check login code
        $ionicPlatform.ready(function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.position = position;
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
                $scope.$apply();
            }, function(e) {
                console.log("Error retrieving position " + e.code + " " + e.message)
            });
            $scope.gotoLocation = function(lat, lon) {
                if ($scope.lat != lat || $scope.lon != lon) {
                    $scope.coordinates = { lat: lat, lon: lon };
                    if (!$scope.$$phase) $scope.$apply("coordinates");
                }
            };

            // some points of interest to show on the map
            // to be user as markers, objects should have "lat", "lon", and "name" properties
            $scope.whoiswhere = [
                { "name":  $scope.place.title, "lat": $scope.coordinates.lat, "lon": $scope.coordinates.lon },
            ];

        });


    })

    .controller('BookIndexController', function($scope, $rootScope, BookService) {
        if (!$rootScope.isTablet) {
            $scope.sideMenuController.close();
        }
        BookService.all(function(books) {
            $scope.books = books;
            $scope.$apply();
        });

        $scope.clearFilter = function() {
            $scope.query = '';
        };
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

    .controller('MediaIndexController', function($scope, $rootScope, MediaService) {
        if (!$rootScope.isTablet) {
            $scope.sideMenuController.close();
        }
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
