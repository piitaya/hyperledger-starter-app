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
    
		activate();

		function activate() {

		}
	}
})();
