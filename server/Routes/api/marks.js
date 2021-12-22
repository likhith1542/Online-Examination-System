var express = require("express");
const router = express.Router();

const Mark = require("../../models/Mark");

router.post("/mark/:testid/:questionid/:userid", (req, res) => {
  
  Mark.findOneAndUpdate(
    {
      TestId: req.params.testid,
      QuestionId: req.params.questionid,
      UserId: req.params.userid,
    },
    {
      TestId: req.params.testid,
      QuestionId: req.params.questionid,
      UserId: req.params.userid,
      Mark: req.body.mark,
    },
    {
      new: true,
      upsert: true,
    }
  )
    .then((retanswer) => {
      res.json(retanswer.Mark);
    })
    .catch((err) => {
    });

  // res.send({
  //   msg: "Mark was given",
  // });
});

router.get("/get/marks/:testid/:questionid/:userid", (req, res) => {
  let myquery = {
    TestId: req.params.testid,
    QuestionId: req.params.questionid,
    UserId: req.params.userid,
  };
  Mark.findOne(myquery, function (err, result) {
    if (err) throw err;
    if(result){
      res.json(result.Mark);
    }else{
      res.json('0');
    }
  });
});

router.get("/get/marks/:testid/:userid", (req, res) => {
  let myquery = {
    TestId: req.params.testid,
    UserId: req.params.userid,
  };
  Mark.find(myquery, function (err, result) {
    if (err) throw err;
    let sum = 0;
    for (let r in result) {
      sum = sum + result[r].Mark;
    }
    res.json({ "tm": sum });
  });
});

module.exports = router;
