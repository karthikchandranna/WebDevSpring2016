var forms = require("./form.mock.json");
var uuid = require('node-uuid');
module.exports = function() {
    var api = {
        findFormIndex: findFormIndex,
        createFieldForForm: createFieldForForm,
        findFieldsForForm: findFieldsForForm,
        findFieldForForm: findFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField
    };
    return api;

    function findFormIndex(formId) {
        var index = -1;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                index = f;
                break;
            }
        }
        return index;
    }

    function createFieldForForm(formId, field) {
        var index = findFormIndex(formId);
        if(index !== -1) {
            var newField = JSON.parse(JSON.stringify(field));
            newField._id = uuid.v1();
            forms[index].fields.push(newField);
            return forms[index].fields;
        }
        return null;
    }

    function findFieldsForForm(formId) {
        var index = findFormIndex(formId);
        if(index !== -1) {
            return forms[index].fields;
        }
        return null;
    }

    function findFieldForForm(formId, fieldId) {
        var index = findFormIndex(formId);
        if(index !== -1) {
            for(var f in forms[index].fields) {
                if (forms[index].fields[f]._id == fieldId) {
                    return forms[index].fields[f];
                }
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        var index = findFormIndex(formId);
        if(index !== -1) {
            var i = -1;
            for (var f in forms[index].fields) {
                if (forms[index].fields[f]._id == fieldId) {
                    i = f;
                    break;
                }
            }
            if (i > -1) {
                forms[index].fields[i] = JSON.parse(JSON.stringify(field));
                return forms[index].fields[i];
            }
        }
        return null;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var index = findFormIndex(formId);
        if(index !== -1) {
            var i = -1;
            for (var f in forms[index].fields) {
                if (forms[index].fields[f]._id == fieldId) {
                    i = f;
                    break;
                }
            }
            if (i > -1) {
                forms[index].fields.splice(i, 1);
                return forms[index].fields;
            }
        }
        return null;
    }

};