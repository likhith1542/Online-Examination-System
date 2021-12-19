import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/tests.css";
import axios from "axios";
import moment from "moment";
import store from "./../store";
function Tests() {
  const complete_color = "#1ac0c6";
  const upcoming_color = "#facd60";
  const missed_color = "#e74645";
  const ans_upload_color = "#456de6";
  const open_exam_color = "#56fbb5";

  const [tests, setTests] = useState([]);
  const [marks, setMarks] = useState([]);

  let userid = store.getState().auth.user.id;

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/tests/get")
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 
  // eslint-disable-next-line
  []);

  useEffect(() => {
    tests.map((test, i) => {
      axios
        .get(
          "http://localhost:5000/api/marks/get/marks/" + test._id + "/" + userid
        )
        .then((res) => {
          setMarks((marks) => [...marks, res.data.tm]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, 
  // eslint-disable-next-line
  [tests]);

  return (
    <div className="tests">
      <div className="testsinner">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Test Name</th>
              <th>Time</th>
              <th>Status</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{test.courseName}</td>
                  <td>
                    <b>Start Time:</b> <br />
                    {moment(test.examDate).format("MMM DD YY, h:mm:ss a")}
                    <br />
                    <b>Duration:</b> <br />
                    {test.duration}
                  </td>
                  <td>
                    {moment(test.examDate)
                      .add(test.duration, "minutes")
                      .diff(moment(), "minutes") -
                      15 >
                      0 && !test.submittedBy.includes(userid) ? (
                      moment(test.examDate).diff(moment(), "minutes") - 15 >
                      0 ? (
                        <div>
                          <span
                            style={{
                              backgroundColor: upcoming_color,
                              padding: "5px 10px",
                              borderRadius: "8px",
                              color: "white",
                            }}
                          >
                            Upcoming
                          </span>
                        </div>
                      ) : (
                        <></>
                      )
                    ) : test.submittedBy.includes(userid) ? (
                      <div>
                        <span
                          style={{
                            backgroundColor: complete_color,
                            padding: "5px 10px",
                            borderRadius: "8px",
                            color: "white",
                            margin: "",
                          }}
                        >
                          Completed
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span
                          style={{
                            backgroundColor: missed_color,
                            padding: "5px 10px",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        >
                          Missed
                        </span>
                      </div>
                    )}
                    <br />
                    {moment(test.examDate).diff(moment(), "minutes") <=
                      test.duration &&
                    moment(test.examDate)
                      .add(test.duration, "minutes")
                      .diff(moment(), "minutes") > 0 &&
                    !test.submittedBy.includes(userid) ? (
                      <div>
                        <Link to={"/test/" + test._id}>
                          <div>
                            <span
                              style={{
                                backgroundColor: open_exam_color,
                                padding: "5px 10px",
                                borderRadius: "8px",
                                color: "white",
                                margin: "",
                              }}
                            >
                              Open Exam
                            </span>
                          </div>
                        </Link>
                        <br />
                        <Link to="/test/1234567891/upload">
                          <div>
                            <span
                              style={{
                                backgroundColor: ans_upload_color,
                                padding: "5px 10px",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            >
                              Upload Answers
                            </span>
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    {moment(test.examDate)
                      .add(test.duration, "minutes")
                      .diff(moment(), "minutes") -
                      15 >
                      0 && !test.submittedBy.includes(userid) ? (
                      "-"
                    ) : (
                      <div>
                        <p>
                          {marks[i]}/{test.marks}
                        </p>
                        {test.submittedBy.includes(userid) ? (
                          <Link to={"/answer/" + test._id}>
                            <div>
                              <span
                                style={{
                                  backgroundColor: complete_color,
                                  padding: "5px 10px",
                                  borderRadius: "8px",
                                  color: "white",
                                  margin: "",
                                }}
                              >
                                View
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tests;
