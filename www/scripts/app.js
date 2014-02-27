angular.module('siloApp', ['ionic', 'ngTouch', 'pascalprecht.translate', 'fsCordova', 'silo.services', 'silo.controllers', 'silo.directives'])

    .run(function($rootScope, $window) {
        $rootScope.windowWidth = $window.outerWidth;
        if ($rootScope.windowWidth < 768) {
            $rootScope.isTablet = false;
        } else {
            $rootScope.isTablet = true;
        }
        angular.element($window).bind('resize', function() {
            $rootScope.windowWidth = $window.outerWidth;
            $rootScope.$apply('windowWidth');
        });
    })

    .config(function($translateProvider) {
        $translateProvider.translations('en', translations_en);
        $translateProvider.translations('es', translations_es);
        $translateProvider.translations('it', translations_it);
        $translateProvider.preferredLanguage('en');
        // console.log("$translateProvider initialized");
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })

            .state('book-index', {
                url: '/books',
                templateUrl: 'views/books.html',
                controller: 'BookIndexController'
            })

            .state('book-detail', {
                url: '/book/:bookId',
                templateUrl: 'views/book-detail.html',
                controller: 'BookDetailController'

            })

            .state('book-read', {
                url: '/read/:bookId',
                templateUrl: 'views/book-read.html',
                controller: 'BookReadController'

            })

            .state('media-index', {
                url: '/media',
                templateUrl: 'views/medias.html',
                controller: 'MediaIndexController'
            })

            .state('media-detail', {
                url: '/media-show/:mediaId',
                templateUrl: 'views/media-detail.html',
                controller: 'MediaDetailController'

            })

            .state('places', {
                url: '/places',
                templateUrl: 'views/places.html',
                controller: 'PlaceIndexController'

            })
            .state('place-detail', {
                url: '/place/:placeId',
                templateUrl: 'views/place-detail.html',
                controller: 'PlaceDetailController'
            })

            .state('info', {
                url: '/info',
                templateUrl: 'views/info.html',
                controller: 'InfoController'
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });
