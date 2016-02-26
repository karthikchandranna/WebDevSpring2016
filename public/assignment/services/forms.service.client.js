(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
            ],

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return model;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.name,
                userId: userId
            };
            model.forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var f in model.forms) {
                if (model.forms[f].userId === userId) {
                    userForms.push(model.forms[f]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var index = -1;
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    index = f;
                    break;
                }
            }
            if (index > -1) {
                model.forms.splice(index, 1);
            }
            callback(model.forms);

        }

        function updateFormById(formId, newForm, callback) {
            var index = -1;
            for (var f in model.forms) {
                if (model.forms[f]._id === formId) {
                    index = f;
                    break;
                }
            }
            if (index > -1) {
                model.forms[index] = {
                    _id: formId,
                    title: newForm.title,
                    userId: newForm.userId
                };
                callback(model.forms[index]);
            }
        }
    }
})();