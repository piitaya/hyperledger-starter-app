(function () {
	'use strict';

	angular
		.module('app')
		.component('home', {
			templateUrl: 'app/home/home.html',
			controller: HomeComponent,
			controllerAs: "vm"
		});

	HomeComponent.$inject = ['accountService'];

	function HomeComponent(accountService) {
		var vm = this;

		vm.account = {};

		activate();

		function activate() {
			accountService.get().then(function(account) {
				vm.account = account;
			}).catch(function(err) {
				console.log(err);
			});
		}
	}
})();
