const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const AnswerSchema = new Schema({
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
  Corrected:{
    type:Boolean,
    default:false
  },
  AnswerUrls:{
      type:[String],
      required:true
  }
});
module.exports = Answer = mongoose.model("Answers", AnswerSchema);
