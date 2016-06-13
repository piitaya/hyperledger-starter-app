(function () {
    'use strict';
        angular
            .module('app')
            .config(config);

        config.$inject = ["$urlRouterProvider", "$stateProvider"];

        function config($urlRouterProvider, $stateProvider) {

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
            })
    }
})();
