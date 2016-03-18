(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController() {
        var vm = this;
        vm.addField = addField;
        vm.fields = [
            {label:"TEXT", placeholder:"TEXT", type:"TEXT"},
            {label:"TEXTAREA", placeholder:"TEXTAREA", type:"TEXTAREA"},
            {label:"DATE", placeholder:"DATE", type:"DATE"},
            {label:"OPTIONS", placeholder:"OPTIONS", type:"OPTIONS",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {label:"CHECKBOXES", placeholder:"CHECKBOXES", type:"CHECKBOXES",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {label:"RADIOS", placeholder:"RADIOS", type:"RADIOS",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]}];

        function addField(fieldType) {
            if (!fieldType) return;
            var field = {"type":fieldType};
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
            console.log(field);
            vm.fields.push(field);
        }
    }
})();
