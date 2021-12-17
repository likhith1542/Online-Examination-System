const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TestSchema = new Schema({
  status: {
    type: String,
  },
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
  duration: {
    type: Number,
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
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});
module.exports = Test = mongoose.model("Tests", TestSchema);
