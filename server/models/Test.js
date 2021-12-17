const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TestSchema = new Schema({
  instructions: {
    type: String,
    default: "Read the Question carefully and answer",
  },
  marks: {
    type: Number,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  courseName: {
    type: String,
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
});
module.exports = Test = mongoose.model("Tests", TestSchema);
