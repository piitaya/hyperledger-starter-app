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
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
})();
