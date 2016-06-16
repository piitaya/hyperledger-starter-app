(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'jwtHelper'];

    /* @ngInject */
    function authService($http, $q, jwtHelper) {
        var service = {
            register: register,
            login: login,
            isAuthenticated: isAuthenticated
        };

        return service;

        function register(username) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/auth/register',
                data: {
                    username: username
                },
                skipAuthorization: true
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function login(username, password) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/auth/login',
                data: {
                    username: username,
                    password: password
                },
                skipAuthorization: true
            }).then(function(response) {
                if (response.data && response.data.token) {
                    var token = response.data.token;
                    localStorage.token = token;
                    deferred.resolve(response.data)
                }
                else {
                    deferred.reject();
                }

            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function isAuthenticated() {
            var token = localStorage.token;

            if (token) {
                if(!jwtHelper.isTokenExpired(token)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
})();
