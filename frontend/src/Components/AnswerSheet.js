import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Test.css";
import DOMPurify from "dompurify";
import axios from "axios";
import Answer from "./Answer";
import "../Styles/Test.css";
import moment from "moment";
import store from "./../store";

function AnswerSheet() {
  let { id } = useParams();
  let navi = useNavigate();
  let userid = store.getState().auth.user.id;

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState(0);

  useEffect(
    () => {
      axios
        .get("http://192.168.29.67:5000/api/tests/get/" + id)
        .then((res) => {
          axios
            .get(
              "http://192.168.29.67:5000/api/tests/test/get/" +
                res.data[0].examId
            )
            .then((res2) => {
              let a =
                moment().diff(res2.data[0].examDate, "minutes") >
                res2.data[0].duration;

              if (a === true) {
                setQuestions(res.data);
              } else {
                navi("/");
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
    // eslint-disable-next-line
    [id]
  );

  useEffect(() => {
    if (questions.length > 0) {
      axios
        .get(
          "http://192.168.29.67:5000/api/marks/get/marks/" +
            id +
            "/" +
            questions[index]._id +
            "/" +
            userid
        )
        .then((res) => {
          setMarks(res.data[0].Mark);
        })
        .catch((err) => {});
    }
  }, [questions, index]);

  return (
    <div className="test">
      {questions.length > 0 && marks ? (
        <div className="testinner">
          <div className="navigator">
            <div>
              <div>
                Marks: {marks}/{questions[index].marks}
              </div>
              {/* <div>Status: Not Submitted</div> */}
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index - 1 >= 0) {
                    setIndex(index - 1);
                  }
                }}
                style={{
                  backgroundColor:
                    index === 0 ? "rgba(165, 42, 42,.5)" : "rgb(165, 42, 42)",
                }}
              >
                Prev
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index + 1 < questions.length) {
                    setIndex(index + 1);
                  }
                }}
                style={{
                  backgroundColor:
                    index === questions.length - 1
                      ? "rgba(165, 42, 42,.5)"
                      : "rgb(165, 42, 42)",
                }}
              >
                Next
              </button>
            </div>
          </div>

          <div
            className="Question"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                index + 1 + ". " + questions[index].question
              ),
            }}
          ></div>
          <Answer questionid={questions[index]._id} showuploads={false} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AnswerSheet;
