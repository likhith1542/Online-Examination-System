const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const MarkSchema = new Schema({
  TestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  QuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Mark:{
      type:Number,
      required:true
  }
});
module.exports = Mark = mongoose.model("Marks", MarkSchema);
