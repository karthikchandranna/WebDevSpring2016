(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }
        else {
            updateUserFormsList();
        }

        //event handlers declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function updateUserFormsList() {
            FormService.findAllFormsForUser($scope.currentUser._id, function (response) {
                $scope.forms = response;
            });
        }

        function addForm(form) {
            if (form && form.title && !form._id) {
                FormService.createFormForUser($scope.currentUser._id, form, function (response) {
                    $scope.form = {};
                    updateUserFormsList();
                })
            }
        }

        function updateForm(form) {
            if (form && form._id) {
                FormService.updateFormById(form._id, form, function (response) {
                    $scope.form = {};
                    updateUserFormsList();
                })
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                if ($scope.form._id && $scope.forms[index]._id === $scope.form._id) {
                    $scope.form = {};
                }
                updateUserFormsList();
            })
        }

        function selectForm(index) {
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId:$scope.forms[index].userId
            };
        }
    }
})();