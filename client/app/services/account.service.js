(function() {
    'use strict';

    angular
        .module('app')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$q'];

    /* @ngInject */
    function accountService($http, $q) {
        var service = {
            create: create,
            get: get
        };

        return service;

        function create() {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/account'
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function get() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/account'
            }).then(function(response) {
                // Auto Initialize account if not exists
                if (response.status == 204) {
                    return $http({
                        method: 'POST',
                        url: '/api/account'
                    });
                }
                else {
                    deferred.resolve(response.data);
                    return deferred.promise;
                }
            }).then(function(response) {
                deferred.resolve(response.data);
            }).catch(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
})();
