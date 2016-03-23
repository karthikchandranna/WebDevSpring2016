(function(){
    angular.module("FilmsterAppCrud")
        .controller("UserCrudController", UserCrudController);

    function UserCrudController($scope){
        var users = [
            {id:111, username: "dcraig", lastname: "Craig", firstname: "Daniel", email: "dcraig@filmster.com",
                password: "djsajd68hdna", "roles": ["user", "admin"]},
            {id:222, username: "pbrosnan", lastname: "Brosnan", firstname: "Pierce", email: "pbrosnan@filmster.com",
                password: "dsfds978yis", "roles": ["user", "critic"]},
            {id:333, username: "tcruise", lastname: "Cruise", firstname: "Tom", email: "tcruise@filmster.com",
                password: "vys7diusdjfk7", "roles": ["user"]},
            {id:444, username: "bpitt", lastname: "Pitt", firstname: "Brad", email: "bpitt@filmster.com",
                password: "7fiuskdfsdfd", "roles": ["user", "critic", "admin"]}
        ];
        $scope.users = users;
        //event handlers declaration
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.findAllUsers = findAllUsers;

        function addUser(user) {
            $scope.newUser = {
                id: user.id,
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                password: user.password,
                roles: user.roles
            };
            $scope.user = {};
            $scope.users.push($scope.newUser);
        }

        function removeUser(user) {
            var index = $scope.users.indexOf(user);
            if ($scope.user && $scope.user.id && user.id === $scope.user.id) {
                $scope.user = {};
                $scope.selectedReviewIndex = {};
            }
            $scope.users.splice(index,1);
        }

        function selectUser(user) {
            $scope.selectedUserIndex = $scope.users.indexOf(user);
            $scope.user={
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
            if (user && $scope.selectedUserIndex >= 0) {
                $scope.users[$scope.selectedUserIndex] = {
                    id: user.id,
                    username: user.username,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    email: user.email,
                    password: user.password,
                    roles: user.roles
                };
                $scope.user = {};
                $scope.selectedUserIndex = {};
            }
        }

        function findAllUsers() {
            return $scope.users;
        }
    }
})();
