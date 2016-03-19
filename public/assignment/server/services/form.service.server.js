module.exports = function(app, formModel) {

    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId", updateForm);
    app.put("/api/assignment/form/:formId/field/", sortFields);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function createFormForUser (req, res) {
        var form = req.body;
        var userId = req.params.userId;
        form = formModel.createFormForUser(userId, form);
        res.json(form);
    }

    function getFormsForUser (req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function getFormById (req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function updateForm (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateForm(formId, form);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function deleteForm (req, res) {
        var formId = req.params.formId;
        if(formModel.deleteForm(formId)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }


    function sortFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        res.json(formModel.sortFields(formId,fields));
    }

};