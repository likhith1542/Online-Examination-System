import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/tests.css";
import axios from "axios";
import moment from "moment";
import store from "./../store";
import { IoMdAdd } from "react-icons/io";
import { GrView } from "react-icons/gr";
function Tests() {
  const complete_color = "#1ac0c6";
  const upcoming_color = "#facd60";
  const missed_color = "#e74645";
  const ans_upload_color = "#456de6";
  const open_exam_color = "#56fbb5";

  const [tests, setTests] = useState([]);

  let userid = store.getState().auth.user.id;

  useEffect(
    async () => {
      await axios
        .get("http://192.168.29.67:5000/api/tests/get")
        .then((res) => {
          setTests(res.data);
        })
        .catch((err) => {});
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="tests">
      <div className="testsinner">
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content", cursor: "pointer" }}>
            <Link to="/createtest">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <IoMdAdd color="white" size={15} /> &nbsp; Create Test
              </button>
            </Link>
          </div>
          <div style={{ margin: "0 10px" }}></div>

          <div style={{ width: "fit-content", cursor: "pointer" }}>
            <Link to="/proctor">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <GrView color="white" size={15} /> &nbsp; Proctor
              </button>
            </Link>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Test Name</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => {
              return test.faculty === userid ? (
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

                          <br />

                          <Link to={"/edittest/" + test._id}>
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
                                Edit
                              </span>
                            </div>
                          </Link>

                          <br />
                          <Link to={"/addstudents/" + test._id}>
                            <div>
                              <span
                                style={{
                                  backgroundColor: missed_color,
                                  padding: "5px 10px",
                                  borderRadius: "8px",
                                  color: "white",
                                  margin: "",
                                }}
                              >
                                Add Students
                              </span>
                            </div>
                          </Link>
                          <br />
                          <Link to={"/addquestions/" + test._id}>
                            <div>
                              <span
                                style={{
                                  backgroundColor: missed_color,
                                  padding: "5px 10px",
                                  borderRadius: "8px",
                                  color: "white",
                                  margin: "",
                                }}
                              >
                                Add Questions
                              </span>
                            </div>
                          </Link>
                        </div>
                      ) : (
                        <></>
                      )
                    ) : (
                      <div>
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
                        <br />
                        <Link to={"/showscripts/" + test._id}>
                          <div>
                            <span
                              style={{
                                backgroundColor: missed_color,
                                padding: "5px 10px",
                                borderRadius: "8px",
                                color: "white",
                                margin: "",
                              }}
                            >
                              Show Scripts
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tests;
