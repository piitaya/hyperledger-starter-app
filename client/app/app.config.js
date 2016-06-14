(function () {
    'use strict';
        angular
            .module('app')
            .config(config);

    config.$inject = ["$urlRouterProvider", "$stateProvider", "$mdIconProvider", "$mdThemingProvider"];

    function config($urlRouterProvider, $stateProvider, $mdIconProvider, $mdThemingProvider) {

        // Material angular
        $mdIconProvider.defaultFontSet('material-icons');

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink');

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
                component: 'main'
            })

            .state('main.home', {
                url: '/',
                component: 'home',
                data: {
                    title: "Home"
                }
            });
    }
})();
