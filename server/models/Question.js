const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  marks:{
      type:Number,
      required:true
  },
  date: {
    type: Date,
    default: Date.now
  },
  examId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required:true
  }
});
module.exports = Question = mongoose.model("Questions", QuestionSchema);
