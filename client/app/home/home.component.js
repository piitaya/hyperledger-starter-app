(function () {
	'use strict';
	
	angular
		.module('app')
		.component('home', {
			templateUrl: 'app/home/home.html',
			controller: HomeComponent,
			controllerAs: "vm"
		});

	HomeComponent.$inject = [];

	function HomeComponent() {
		var vm = this;

		activate();

		function activate() {

		}
	}
})();
