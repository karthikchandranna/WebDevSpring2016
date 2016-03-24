(function(){
    angular.module("FilmsterAppCrud")
        .controller("UserCrudController", UserCrudController);

    function UserCrudController(){
        var vm = this;
        vm.users = [
            {id:111, username: "dcraig", lastname: "Craig", firstname: "Daniel", email: "dcraig@filmster.com",
                password: "djsajd68hdna", "roles": ["user", "admin"]},
            {id:222, username: "pbrosnan", lastname: "Brosnan", firstname: "Pierce", email: "pbrosnan@filmster.com",
                password: "dsfds978yis", "roles": ["user", "critic"]},
            {id:333, username: "tcruise", lastname: "Cruise", firstname: "Tom", email: "tcruise@filmster.com",
                password: "vys7diusdjfk7", "roles": ["user"]},
            {id:444, username: "bpitt", lastname: "Pitt", firstname: "Brad", email: "bpitt@filmster.com",
                password: "7fiuskdfsdfd", "roles": ["user", "critic", "admin"]}
        ];
        //event handlers declaration
        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.findAllUsers = findAllUsers;

        function addUser(user) {
            vm.newUser = {
                id: user.id,
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: user.password,
                roles: user.roles
            };
            vm.user = {};
            vm.users.push(vm.newUser);
        }

        function removeUser(user) {
            var index = vm.users.indexOf(user);
            if (vm.user && vm.user.id && user.id === vm.user.id) {
                vm.user = {};
                vm.selectedReviewIndex = {};
            }
            vm.users.splice(index,1);
        }

        function selectUser(user) {
            vm.selectedUserIndex = vm.users.indexOf(user);
            vm.user={
                id: user.id,
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: user.password,
                roles: user.roles
            };
        }

        function updateUser(user) {
            if (user && vm.selectedUserIndex >= 0) {
                vm.users[vm.selectedUserIndex] = {
                    id: user.id,
                    username: user.username,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    password: user.password,
                    roles: user.roles
                };
                vm.user = {};
                vm.selectedUserIndex = {};
            }
        }

        function findAllUsers() {
            return vm.users;
        }
    }
})();
