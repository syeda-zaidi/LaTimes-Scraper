var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotesSchema = new Schema({

    type: String,

    body: String
});

var Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
