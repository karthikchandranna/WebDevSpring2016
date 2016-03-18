(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController() {
        var vm = this;
        vm.addField = addField;
        vm.renderModal = renderModal;
        vm.editField = editField;
        vm.removeField = removeField;
        vm.field = {};
        vm.fields = [
            {"_id":"1",label:"Text", placeholder:"TEXT", type:"TEXT"},
            {"_id":"2",label:"TextArea", placeholder:"TEXTAREA", type:"TEXTAREA"},
            {"_id":"3",label:"Date", placeholder:"DATE", type:"DATE"},
            {"_id":"4",label:"Dropdown", placeholder:"OPTIONS", type:"OPTIONS",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {"_id":"5",label:"Checkbox", placeholder:"CHECKBOXES", type:"CHECKBOXES",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {"_id":"6",label:"Radio Button", placeholder:"RADIOS", type:"RADIOS",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]}];

        function addField(fieldType) {
            if (!fieldType) return;
            var field = {"_id":(new Date()).getTime(), "type":fieldType};
            switch(fieldType) {
                case "TEXT":
                case "TEXTAREA":
                    field.label="New Text Field";
                    field.placeholder="New Text Field";
                    break;
                case "DATE":
                    field.label = "New Date Field";
                    break;
                case "OPTIONS":
                    field.label="New Dropdown";
                    field.options=[
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ];
                    break;
                case "CHECKBOXES":
                    field.label="New Checkboxes";
                    field.options=[
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ];
                    break;
                case "RADIOS":
                    field.label="New Radio Buttons";
                    field.options=[
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ];
                    break;
            }
            vm.fields.push(field);
        }

        function renderModal(fieldId) {
            var f;
            for (f in vm.fields) {
                if (vm.fields[f]._id === fieldId) {
                    break;
                }
            }
            vm.field = angular.copy(vm.fields[f]);
            if(vm.field.options) {
                vm.field.optionsStr = "";
                for (var o in vm.field.options) {
                    vm.field.optionsStr += vm.field.options[o].label.toString() + ":" +
                        vm.field.options[o].value.toString() + "\n";
                }
            }
            $("#myModal").modal();
        }

        function editField(newField) {

            if(newField.optionsStr) {
                var newOptions = [];
                var optionLine = vm.field.optionsStr.split("\n");
                for(var o in optionLine) {
                    var items = optionLine[o].split(":");
                    var option = {"label": items[0], "value": items[1]};
                    newOptions.push(option);
                }
                newField.options = newOptions;
                delete newField.optionsStr;
            }
            var index;
            for (index in vm.fields) {
                if (vm.fields[index]._id === newField._id) {
                    break;
                }
            }
            vm.fields[index] = newField;
        }

        function removeField(fieldId) {
            var f;
            for (f in vm.fields) {
                if (vm.fields[f]._id === fieldId) {
                    break;
                }
            }
            vm.fields.splice(f,1);
        }
    }
})();
