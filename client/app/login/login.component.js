(function () {
	'use strict';
	
	angular
		.module('app')
		.component('login', {
            templateUrl: 'app/login/login.html',
            controller: LoginComponent,
            controllerAs: "vm"
        });

	LoginComponent.$inject = [];

	function LoginComponent() {
		var vm = this;

		vm.login = login;

		activate();

		function activate() {

		}

		function login() {
			console.log("login");
		}
	}
})();
