module.exports = function(app, fieldModel) {

    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);

    function createFieldForForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        var fields = fieldModel.createFieldForForm(formId, field);
        res.json(fields);
    }

    function getFieldsForForm (req, res) {
        var formId = req.params.formId;
        var fields = fieldModel.findFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.findFieldForForm(formId, fieldId);
        res.json(field);
    }

    function updateField (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fields = fieldModel.updateField(formId, fieldId, field);
        if(fields) {
            res.json(fields);
            return;
        }
        res.json({message: "Field not found"});
    }

    function deleteField (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = fieldModel.deleteFieldFromForm(formId, fieldId);
        if(fields) {
            res.json(fields);
            return;
        }
        res.json({message: "Field not found"});
    }

};