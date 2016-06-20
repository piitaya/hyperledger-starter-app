(function () {
	'use strict';

	angular
		.module('app')
		.component('home', {
			templateUrl: 'app/home/home.html',
			controller: HomeComponent,
			controllerAs: "vm",
			bindings: {
				account: "="
			}
		});

	HomeComponent.$inject = ['thingService'];

	function HomeComponent(thingService) {
		var vm = this;

		vm.things = [];

		vm.buy = buy;

		activate();

		function activate() {
			thingService.getMarket().then(function(things) {
				vm.things = things;
			});
		}

		function buy(thing) {
			thingService.buy(thing.id).then(function() {
				vm.account.money -= thing.price;
				vm.things.splice([vm.things.indexOf(thing)],1);
			});
		}
	}
})();
