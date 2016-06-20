(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ["$urlRouterProvider", "$stateProvider", "$httpProvider", "jwtInterceptorProvider", "$mdIconProvider", "$mdThemingProvider"];

    function config($urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, $mdIconProvider, $mdThemingProvider) {

        // Material angular
        $mdIconProvider.defaultFontSet('material-icons');

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink');

        // Headers token
        jwtInterceptorProvider.tokenGetter = function() {
            return localStorage.token;
        };

        $httpProvider.interceptors.push('jwtInterceptor');

        // Routes
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get("$state");
            $state.go('main.home');
        });

        $stateProvider
            .state('login', {
                url: '/login',
                component: 'login',
                data: {
                    title: "Login"
                }
            })

            .state ('main', {
                abstract: true,
                component: 'main',
                data: {
                    requiresLogin: true
                },
                resolve: {
                    account: function(accountService) {
                        return accountService.get();
                    }
                }
            })

            .state('main.home', {
                url: '/',
                component: 'home',
                data: {
                    title: "Home"
                },
                resolve: {
                    things: function(thingService) {
                        return thingService.getMarket();
                    }
                }
            })

            .state('main.account', {
                url: '/account',
                component: 'account',
                data: {
                    title: "Account"
                },
                resolve: {
                    things: function(thingService) {
                        return thingService.getPersonalThings();
                    }
                }
            });
    }

    angular.module("app")
        .run(run);

    run.$inject = ['$transitions', 'authService'];

    function run($transitions, authService) {
        $transitions.onStart({}, function($state, $transition$) {
            if ($transition$.$to().data && $transition$.$to().data.requiresLogin) {
                if (!authService.isAuthenticated()) {
                    $state.go("login");
                 }
            }
        });
    }

})();
