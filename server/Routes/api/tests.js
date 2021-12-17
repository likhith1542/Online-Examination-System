var express = require("express");
const router = express.Router();
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");

// Load Test model
const Test = require("../../models/Test");
const Question = require("../../models/Question");
const Answer = require("../../models/Answer");

// @route POST api/questions/register
// @desc Create Test
// @access admin
router.post("/create", (req, res) => {
  if (
    req.body.marks === null ||
    req.body.examdate === null ||
    req.body.coursename === null ||
    req.body.examname === null
  ) {
    return res.status(400).json({ error: "Enter All Required Fields" });
  }

  if (
    req.body.marks.trim() === "" ||
    req.body.examdate.trim() === "" ||
    req.body.coursename.trim() === "" ||
    req.body.examname.trim() === ""
  ) {
    return res.status(400).json({ error: "Enter All Required Fields" });
  }

  const newTest = new Test({
    instructions: req.body.instructions
      ? req.body.instructions
      : "Read the Question carefully and answer",
    marks: req.body.marks,
    examDate: new Date(req.body.examdate),
    courseName: req.body.coursename,
    examName: req.body.examname,
  });

  newTest
    .save()
    .then((test) => res.json(test))
    .catch((err) => console.log(err));
});
// @route POST api/tests/edit/:id
// @desc edit Test
// @access admin
router.post("/edit/:id", (req, res) => {});

// @route GET api/tests/get/:id
// @desc get Question
// @access public

router.get("/get/:id", (req, res) => {
  let myquery = { examId: req.params.id };
  Question.find(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// @route POST api/tests/upload/:testid/:questionid/:userid
// @desc POST Answers Image
// @access public

var s3 = new aws.S3({
  accessKeyId: "AKIAY7NQXQQ2FCWJG7ZS",
  secretAccessKey: "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",
  Bucket: "oesbylikhith",
});
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "oesbylikhith",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

router.post(
  "/upload/:testid/:questionid/:userid",
  upload.array("files"),
  function (req, res, next) {
    var returnfiles = req.files;
    var returnurls = [];
    for (let i = 0; i < returnfiles.length; i++) {
      returnurls.push(returnfiles[i].location);
    }

    console.log(returnurls);

    const newAnswer = new Answer({
      TestId: req.params.testid.trim(),
      QuestionId: req.params.questionid.trim(),
      UserId: req.params.userid.trim(),
      AnswerUrls: returnurls,
    });

    newAnswer
      .save()
      .then((test) => res.send(test))
      .catch((err) => console.log(err));

    res.send({
      msg: "Successfully uploaded " + req.files.length + " files!",
    });
  }
);

module.exports = router;
