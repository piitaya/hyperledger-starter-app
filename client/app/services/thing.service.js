(function() {
    'use strict';

    angular
        .module('app')
        .factory('thingService', thingService);

    thingService.$inject = ['$http', '$q'];

    /* @ngInject */
    function thingService($http, $q) {
        var service = {
            create: create,
            getMarket: getMarket,
            getPersonalThings: getPersonalThings,
            sell: sell,
            buy: buy
        };

        return service;

        function create() {

        }

        function getMarket() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/things?market=true'
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getPersonalThings() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/things?me=true'
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function sell(thingId, price) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: '/api/things/' + thingId + '/sell',
                data: {
                    price: price
                }
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function buy(thingId) {
            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: '/api/things/' + thingId + '/buy'
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
})();
