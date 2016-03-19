var mock = require("./form.mock.json");
var uuid = require('node-uuid');
module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        sortFields: sortFields
    };
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: uuid.v1(),
            title: form.title,
            userId: userId,
            fields: form.fields
        };
        mock.push(newForm);
        return newForm;
    }

    function findAllForms() {
        return mock;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (var f in mock) {
            if (mock[f].userId == userId) {
                userForms.push(mock[f]);
            }
        }
        return userForms;
    }

    function findFormById(formId) {
        for(var f in mock) {
            if( mock[f]._id == formId ) {
                return mock[f];
            }
        }
        return null;
    }

    function updateForm(formId, newForm) {
        var index = -1;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                index = f;
                break;
            }
        }
        if (index > -1) {
            mock[index] = {
                _id: formId,
                title: newForm.title,
                userId: newForm.userId,
                fields: newForm.fields
            };
            return mock[index];
        }
        return null;
    }

    function deleteForm(formId) {
        var index = -1;
        for (var f in mock) {
            if (mock[f]._id == formId) {
                index = f;
                break;
            }
        }
        if (index > -1) {
            mock.splice(index, 1);
            return true;
        }
        return false;
    }

    function findFormByTitle(title) {
        for(var f in mock) {
            if( mock[f].title === title ) {
                return mock[f];
            }
        }
        return null;
    }

    function sortFields(formId,fields){
        var form = findFormById(formId);
        if(form){
            form.fields = fields;
            return updateForm(formId, form).fields;
        }
        return null;
    }
};