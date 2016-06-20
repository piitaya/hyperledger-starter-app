(function () {
	'use strict';

	angular
		.module('app')
		.component('login', {
            templateUrl: 'app/login/login.html',
            controller: LoginComponent,
            controllerAs: "vm"
        });

	LoginComponent.$inject = ["authService", "$state"];

	function LoginComponent(authService, $state) {
		var vm = this;

		vm.login = login;
		vm.register = register;
		vm.switchMode = switchMode;

		vm.credentials = {};
		vm.mode = "login";

		activate();

		function activate() {

		}

		function login() {
			authService.login(vm.credentials.username, vm.credentials.password).then(function(data) {
				console.log("res", data);
				$state.go("main.home");
			}).catch(function(err) {
				console.log("err", err);
			})
		}

		function register() {
			authService.register(vm.credentials.username).then(function(data) {
				console.log("res", data);
				vm.mode = "login";
				vm.password = data.password;
			}).catch(function(err) {
				console.log("err", err);
			})
		}

		function switchMode() {
			vm.mode = vm.mode == "login" ? "register" : "login";
		}
	}
})();
