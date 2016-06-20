(function () {
	'use strict';

	angular
		.module('app')
		.component('new', {
			templateUrl: 'app/new/new.html',
			controller: NewComponent,
			controllerAs: "vm"
		});

	NewComponent.$inject = ['thingService'];

	function NewComponent(thingService) {
		var vm = this;

		vm.thing = {
            name: ""
        };
		vm.create = create;

		activate();

        function activate() {

        }

		function create() {
			thingService.create(vm.thing).then(function(result) {
				console.log("created !");
			});
		}
	}
})();
