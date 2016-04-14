(function () {
    "use strict";
    angular
        .module("FilmsterApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, CriticService) {
        var vm = this;
        vm.accept = accept;
        vm.reject = reject;
        vm.getCritics = getCritics;

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.currentUser = response.data;
                });
            getCritics();
        }
        return init();

        function getCritics(){
            CriticService
                .getAllCritics()
                .then(function(response){
                    vm.critics = response.data;
                    console.log(vm.critics);
                });
        }

        function accept(critic) {
            console.log(critic);
            //remove from critic table
            CriticService
                .deleteCritic(critic._id)
                .then(function(response){
                    vm.critics = response.data;
                    console.log(vm.critics);
                });
            // add critic role to critic.userId
            UserService
                .addRole(critic.userId, {"role":"critic"})
                .then(function (response) {
                    console.log(response.data);
                });
            getCritics();
        }

        function reject(critic) {
            console.log(critic);
            //remove from critic table
            CriticService
                .deleteCritic(critic._id)
                .then(function(response){
                    vm.critics = response.data;
                    console.log(vm.critics);// should return the new list of critics instead of Object {ok: 1, n: 1}
                });
            getCritics();
        }
    }
})();