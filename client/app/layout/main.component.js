(function () {
	'use strict';

	angular
		.module('app')
		.component('main', {
            templateUrl: 'app/layout/main.html',
            controller: MainComponent,
            controllerAs: "vm",
			bindings: {
				account: "="
			}
        });

	MainComponent.$inject = [];

	function MainComponent() {
		var vm = this;

		activate();

		function activate() {
		}
	}
})();
