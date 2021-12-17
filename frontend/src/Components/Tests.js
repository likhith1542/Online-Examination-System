import React from "react";
import { Link } from "react-router-dom";
import "../Styles/tests.css";

function Tests() {
  const complete_color = "#1ac0c6";
  const upcoming_color = "#facd60";
  const missed_color = "#e74645";
  const ans_upload_color = "#456de6";
  const open_exam_color = "#56fbb5";

  return (
    <div className="tests">
      <div className="testsinner">
        <table>
          <tr>
            <th>S.No</th>
            <th>Test Name</th>
            <th>Time</th>
            <th>Status</th>
            <th>Result</th>
          </tr>
          <tr>
            <td>1</td>
            <td>CSE3004</td>
            <td>
              <b>Start Time:</b> <br />
              05 Dec 2021 10:00:00 (India Standard Time) <br />
              <b>Duration:</b> <br />
              110 minutes
            </td>
            <td>
              <Link to="/test/61ba882b9d6544b9d790312e">
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
            </td>
            <td>50/50</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Tests;
