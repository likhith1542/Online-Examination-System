import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/tests.css";
import axios from "axios";
import moment from "moment";
import store from "../store";
import { IoMdAdd } from "react-icons/io";
import { GrView } from "react-icons/gr";

function ProctorTests() {
  const missed_color = "#e74645";
  let userid = store.getState().auth.user.id;
  const [tests, setTests] = useState([]);

  useEffect(
    async () => {
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
    []
  );

  return (
    <div className="tests">
      <div className="testinner">
        <table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => {
              return moment(test.examDate).diff(moment(), "minutes") <=
                test.duration &&
                moment(test.examDate)
                  .add(test.duration, "minutes")
                  .diff(moment(), "minutes") > 0 ? (
                <tr key={i + 1}>
                  <td>{test.courseName}</td>
                  <td>
                    <b>Start Time:</b> <br />
                    {moment(test.examDate).format("MMM DD YY, h:mm:ss a")}
                    <br />
                    <b>Duration:</b> <br />
                    {test.duration}
                  </td>
                  <td>
                    <Link to={"/proctor/" + test._id}>
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
                          Proctor This Exam
                        </span>
                      </div>
                    </Link>
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

export default ProctorTests;
