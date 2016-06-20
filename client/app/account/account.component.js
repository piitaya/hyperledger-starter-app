(function () {
	'use strict';

	angular
		.module('app')
		.component('account', {
			templateUrl: 'app/account/account.html',
			controller: AccountComponent,
			controllerAs: "vm",
			bindings: {
				account: "=",
				things: "="
			}
		});

	AccountComponent.$inject = ['thingService', '$mdDialog'];

	function AccountComponent(thingService, $mdDialog) {
		var vm = this;

		vm.create = create;
        vm.sell = sell;

		activate();

		function activate() {

		}

		function create() {

            $mdDialog.show({
                controller: CreateController,
                controllerAs: "vm",
                templateUrl: 'app/account/create-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: false
            }).then(function(newThing) {
                thingService.create(newThing).then(function(thingResponse) {
                    vm.things.push(thingResponse);
                });
            });
		}

		function sell(thing, price) {

            $mdDialog.show({
                controller: SellController,
                controllerAs: "vm",
                templateUrl: 'app/account/sell-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: false,
                locals: {
                    thing: thing
                }
            }).then(function(updatedThing) {
                thingService.sell(updatedThing.id, updatedThing.price).then(function(result) {
                    thing.inMarket = true;
                    thing.price = updatedThing.price;
                });
            });
		}
	}

	function CreateController($mdDialog) {
        var vm = this;

		vm.thing = {
            name: ""
        };

        vm.cancel = function() {
            $mdDialog.cancel();
        };
        vm.create = function() {
            $mdDialog.hide(vm.thing);
        };
    }

    function SellController($mdDialog, thing) {
        var vm = this;

        vm.thing = angular.copy(thing);
        vm.thing.price = 0;

        vm.cancel = function() {
            $mdDialog.cancel();
        };
        vm.sell = function() {
            $mdDialog.hide(vm.thing);
        };
    }
})();
