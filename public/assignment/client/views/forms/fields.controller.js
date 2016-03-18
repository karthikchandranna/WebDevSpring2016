(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController() {
        var vm = this;
        vm.fields = [
            {label:"TEXT", placeholder:"TEXT", fieldType:"TEXT"},
            {label:"TEXTAREA", placeholder:"TEXTAREA", fieldType:"TEXTAREA"},
            {label:"DATE", placeholder:"DATE", fieldType:"DATE"},
            {label:"DROPDOWN", placeholder:"DROPDOWN", fieldType:"DROPDOWN",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {label:"CHECKBOX", placeholder:"CHECKBOX", fieldType:"CHECKBOX",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]},
            {label:"RADIO", placeholder:"RADIO", fieldType:"RADIO",
                options:[
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"}]}]
    }
})();
