import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Test.css";
import DOMPurify from "dompurify";
import axios from "axios";
import Answer from "./Answer";
import "../Styles/Test.css";
import moment from "moment";
import store from "./../store";
import Room from "./../video/Room";
import { AiFillCamera } from "react-icons/ai";

// var elem = document.documentElement;
function Test() {
  let { id } = useParams();
  let navi = useNavigate();
  let userid = store.getState().auth.user.id;

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  useEffect(async () => {
    const data = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: userid,
        room: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setToken(data.token);
  }, [id, userid]);

  const handleLogout = useCallback((event) => {
    event.preventDefault();
    setToken(null);
  }, []);

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
              if (res2.data[0].submittedBy.includes(userid)) {
                navi("/");
              }

              let a =
                moment().diff(res2.data[0].examDate, "minutes") <
                res2.data[0].duration;
              let b =
                moment().diff(res2.data[0].examDate, "minutes") >
                -1 * res2.data[0].duration;

              if (a === true && b === true) {
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

  const submitExam = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.29.67:5000/api/tests/submit/" + id + "/" + userid)
      .then((res) => {
        navi("/");
      })
      .catch((err) => {});
  };

  return (
    <div className="test">
      <div style={{ display: open ? "block" : "none", marginTop: "25px" }}>
        <Room roomName={id} token={token} handleLogout={handleLogout} />
      </div>
      <div>
        <button
          className="cambutton"
          onClick={(e) => {
            handleModal(e);
          }}
        >
          <AiFillCamera size={25} />
        </button>
      </div>
      {questions.length > 0 ? (
        <div className="testinner">
          <div className="navigator">
            <div>
              <button
                onClick={(e) => {
                  handleLogout(e);
                  submitExam(e);
                }}
              >
                Submit Exam
              </button>
            </div>
            <div>
              <div>Marks: {questions[index].marks}</div>
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
          <Answer questionid={questions[index]._id} showuploads={true} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Test;
