angular.module('siloApp', ['ionic', 'ngTouch', 'pascalprecht.translate', 'silo.services', 'silo.controllers'])

    .config(function($translateProvider) {
        $translateProvider.translations('en', $translations_en);
        $translateProvider.translations('es', $translations_es);
        $translateProvider.translations('it', $translations_it);
        $translateProvider.preferredLanguage('en');
        // console.log("$translateProvider initialized");
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "views/tabs.html"
            })

            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'views/home.html',
                        controller: 'HomeController'
                    }
                }
            })

            .state('tab.book-index', {
                url: '/books',
                views: {
                    'books-tab': {
                        templateUrl: 'views/book-index.html',
                        controller: 'BookIndexController'
                    }
                }
            })

            .state('tab.book-detail', {
                url: '/book/:bookId',
                views: {
                    'books-tab': {
                        templateUrl: 'views/book-detail.html',
                        controller: 'BookDetailController'
                    }
                }
            })

            .state('tab.media-index', {
                url: '/media',
                views: {
                    'media-tab': {
                        templateUrl: 'views/media-index.html',
                        controller: 'MediaIndexController'
                    }
                }
            })

            .state('tab.media-detail', {
                url: '/media-show/:mediaId',
                views: {
                    'media-tab': {
                        templateUrl: 'views/media-detail.html',
                        controller: 'MediaDetailController'
                    }
                }
            })

            .state('tab.map', {
                url: '/map',
                views: {
                    'map-tab': {
                        templateUrl: 'views/map.html'
                    }
                }
            })

            .state('tab.info', {
                url: '/info',
                views: {
                    'info-tab': {
                        templateUrl: 'views/info.html',
                        controller: 'InfoController'
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    });
