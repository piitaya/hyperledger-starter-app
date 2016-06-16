(function () {
	'use strict';

	angular
		.module('app')
		.component('header', {
            templateUrl: 'app/layout/header.html',
            controller: HeaderComponent,
            controllerAs: "vm",
			bindings: {
				account: "="
			}
        });

	HeaderComponent.$inject = ["$state"];

	function HeaderComponent($state) {
		var vm = this;

		vm.logout = logout;
		activate();

		function activate() {
		}

		function logout() {
			delete localStorage.token
			$state.go("login");
		};
	}
})();
