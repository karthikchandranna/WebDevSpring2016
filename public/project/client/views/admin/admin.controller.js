(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, CriticService) {
        var vm = this;
        vm.accept = accept;
        vm.reject = reject;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                });
            CriticService
                .getAllCritics()
                .then(function(response){
                    vm.critics = response.data;
                    console.log(vm.critics);
                });
        }
        return init();

        function accept(critic) {
            console.log(critic);
            //remove from critic table and add critic role to critic.userId
        }

        function reject(critic) {
            console.log(critic);
            //remove from critic table
        }
    }
})();