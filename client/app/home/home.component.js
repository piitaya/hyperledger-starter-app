(function () {
	'use strict';

	angular
		.module('app')
		.component('home', {
			templateUrl: 'app/home/home.html',
			controller: HomeComponent,
			controllerAs: "vm"
		});

	HomeComponent.$inject = ['thingService'];

	function HomeComponent(thingService) {
		var vm = this;

		vm.things = [];
		vm.market = [];

		vm.sell = sell;
		vm.buy = buy;

		activate();

		function activate() {
			thingService.getPersonalThings().then(function(things) {
				vm.things = things;
			});
			thingService.getMarket().then(function(things) {
				vm.market = things;
			});
		}

		function sell(id) {
			thingService.sell(id, 300).then(function() {
				console.log("sold !")
			});
		}

		function buy(id) {
			thingService.buy(id).then(function() {
				console.log("bought !")
			});
		}
	}
})();
