const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

// Load Question model
const Question = require("../../models/Question");
// @route POST api/questions/register
// @desc upload Question
// @access admin
router.post("/upload", (req, res) => {
  if (
    req.body.question === null ||
    req.body.marks === null ||
    req.body.examid === null
  ) {
    return res.status(400).json({ error: "Enter All Required Fields" });
  }

  if (
    req.body.question.trim() === "" ||
    req.body.marks.trim() === "" ||
    req.body.examid.trim() === ""
  ) {
    return res.status(400).json({ error: "Enter All Required Fields" });
  }
  const newQuestion = new Question({
    question: req.body.question,
    marks: req.body.marks,
    examId: req.body.examid,
  });

  newQuestion
    .save()
    .then((question) => res.json(question))
    .catch((err) => console.log(err));
});
// @route POST api/questions/edit/:id
// @desc edit Question
// @access admin
router.post("/edit/:id", (req, res) => {});

// @route GET api/questions/get/:id
// @desc get Question
// @access public
router.get("/get/:id", (req, res) => {
  let myquery = { _id: ObjectId(req.params.id) };
  Question.findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
