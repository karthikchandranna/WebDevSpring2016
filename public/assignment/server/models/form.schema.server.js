module.exports = function (mongoose) {
    var FieldSchema = require("./field.schema.js")(mongoose);
    var FormSchema = mongoose.Schema({
        userId: "String",
        title: { type: "String", default: "New Form" },
        fields: [FieldSchema],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }, {collection: "assignment.form"});
    return FormSchema;
};