(function () {
	'use strict';
	angular
		.module('app')
		.component('monitor', {
            templateUrl: 'app/monitor/monitor.html',
            controller: MonitorComponent,
            controllerAs: "vm"
        });

	MonitorComponent.$inject = [];

	function MonitorComponent() {
		var vm = this;
    vm.open = false;
    vm.items = [];

    vm.add = add;
    vm.remove = remove;
		activate();

		function activate() {
        for (var i=1; i <= 5; i++) {
            vm.items.push(i);
        }
		}

    function add(e) {
        vm.items.push(vm.items.length + 1);
        e.stopPropagation();
    }

    function remove(e) {
        vm.items.splice(vm.items.length - 1, 1);
        e.stopPropagation();
    }
	}
})();
