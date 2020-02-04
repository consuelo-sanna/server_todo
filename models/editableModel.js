const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EditableSchema = new Schema({
  title: {
    type: String,
    require: false
  }
});

module.exports = Editable = mongoose.model("editable", EditableSchema);
