(function () {
	'use strict';

	angular
		.module('app')
		.component('login', {
            templateUrl: 'app/login/login.html',
            controller: LoginComponent,
            controllerAs: "vm"
        });

	LoginComponent.$inject = ["authService"];

	function LoginComponent(authService) {
		var vm = this;

		vm.login = login;
		vm.register = register;
		vm.credentials = {};
		vm.username = undefined;

		activate();

		function activate() {

		}

		function login() {
			authService.login(vm.credentials.username, vm.credentials.password).then(function(data) {
				console.log("res", data);
			}).catch(function(err) {
				console.log("err", err);
			})
		}

		function register() {
			authService.register(vm.username).then(function(data) {
				console.log("res", data);
			}).catch(function(err) {
				console.log("err", err);
			})
		}
	}
})();
