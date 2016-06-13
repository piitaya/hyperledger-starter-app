(function () {
	'use strict';
	angular
		.module('app')
		.component('header', {
            templateUrl: 'app/layout/header.html',
            controller: HeaderComponent,
            controllerAs: "vm"
        });

	HeaderComponent.$inject = [];

	function HeaderComponent() {
		var vm = this;

		activate();

		function activate() {

		}
	}
})();
