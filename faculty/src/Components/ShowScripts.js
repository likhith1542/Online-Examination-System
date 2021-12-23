import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Styles/scripts.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DOMPurify from "dompurify";

function ShowScripts() {
  let { testid } = useParams();
  const [scripts, setScripts] = useState([]);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);
  const [mark, setMark] = useState("NA");
  const [open, setOpen] = React.useState(false);
  const [totalMark, setTotalMark] = useState(0);
  const [editing, setEditing] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://192.168.29.67:5000/api/users/get")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {});

    axios
      .get("http://192.168.29.67:5000/api/tests/showscripts/" + testid)
      .then((res) => {
        setScripts(res.data);
      })
      .catch((err) => {});

    axios
      .get("http://192.168.29.67:5000/api/tests/get/" + testid)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {});
  }, [testid]);

  const getUserName = (userid) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === userid) {
        // setUserIdd(users[i]._id);
        return users[i].name;
      }
    }

    return "Not Found";
  };

  const getUserId = (userid) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === userid) {
        return users[i].regNo;
      }
    }

    return "Not Found";
  };

  const getQuestion = (questionId) => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i]._id === questionId) {
        // setQuestionIdd(questions[i]._id);
        return questions[i].question;
      }
    }

    return "Not Found";
  };

  // useEffect(() => {
  //   if(userIdd && questionIdd){
  //     getMarks()
  //   }

  //   return () => {
  //     setMark('NA');
  //   };
  // }, [userIdd,questionIdd,index]);

  const getTotalMarks = (userid) => {
    axios
      .get(
        "http://192.168.29.67:5000/api/marks/get/marks/" + testid + "/" + userid
      )
      .then((res) => {
        setTotalMark(res.data.tm.toString());
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setEditing(false);
    setIndex1(0);
    setMark("NA");
  }, [index]);

  const submitMark = (e, userId, questionId) => {
    e.preventDefault();

    axios
      .post(
        "http://192.168.29.67:5000/api/marks/mark/" +
          testid +
          "/" +
          questionId +
          "/" +
          userId,
        { mark: mark }
      )
      .then((res) => {
        setMark(res.data.toString());
        getTotalMarks(userId);
      })
      .catch((err) => {});
  };

  return (
    <div className="scripts">
      {scripts.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Reg.No</th>
                <th>Name</th>
                <th>Scripts</th>
                <th>Corrected</th>
              </tr>
            </thead>
            <tbody>
              {scripts.map((script, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{getUserId(script._id)}</td>
                  <td>{getUserName(script._id)}</td>
                  <td>
                    {/* <Link to={"/script/" + getUserId(script._id)}> */}
                    <button
                      style={{ backgroundColor: "#1ac0c6" }}
                      onClick={(e) => {
                        getTotalMarks(script._id);
                        handleOpen();
                      }}
                    >
                      View Scripts
                    </button>
                    {/* </Link> */}
                  </td>
                  <td>No</td>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className="box showscript">
                      <div className="">
                        <button
                          style={{
                            marginRight: "12.5px",
                            marginTop: "12.5px",
                            opacity: index == 0 ? "50%" : "100%",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (index - 1 >= 0) {
                              setIndex(index - 1);
                            }
                          }}
                        >
                          Prev
                        </button>
                        <span>Question {index + 1}</span>
                        <button
                          style={{
                            marginLeft: "12.5px",
                            marginTop: "12.5px",
                            opacity:
                              index == questions.length - 1 ? "50%" : "100%",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (index + 1 < questions.length) {
                              setIndex(index + 1);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                      <div className="horizontalbox2">
                        <div className="divcentered">
                          <p
                            style={{
                              backgroundColor: "bisque",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                getQuestion(script.questionId[index])
                              ),
                            }}
                          ></p>
                          <div className="horizontalbox">
                            <div className="holderl">
                              <p className="marks">{totalMark}</p>
                              <button
                                style={{
                                  position: "fixed",
                                  top: "50%",
                                  left: "10%",
                                  opacity: index1 == 0 ? "50%" : "100%",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (index1 - 1 >= 0) {
                                    setIndex1(index1 - 1);
                                  }
                                }}
                              >
                                Prev Image
                              </button>
                            </div>

                            <img
                              src={script.AnswerUrls[index][index1]}
                              style={{ maxWidth: "850px" }}
                            />
                            <div className="holder">
                              <input
                                className="marks"
                                type="text"
                                value={
                                  script.Marks[index]["Mark"] && !editing
                                    ? script.Marks[index]["Mark"]
                                    : mark
                                }
                                onChange={(e) => {
                                  setEditing(true);
                                  setMark(e.target.value);
                                }}
                              />

                              {mark !== "NA" &&
                              mark.toString().trim() !== "" ? (
                                <button
                                  style={{
                                    marginTop: "25px",
                                    position: "fixed",
                                    right: "10%",
                                    top: "40%",
                                  }}
                                  onClick={(e) => {
                                    submitMark(
                                      e,
                                      script._id,
                                      script.questionId[index]
                                    );
                                  }}
                                >
                                  Submit Mark
                                </button>
                              ) : (
                                <></>
                              )}

                              <button
                                style={{
                                  position: "fixed",
                                  top: "50%",
                                  right: "10%",
                                  opacity:
                                    index1 ==
                                    script.AnswerUrls[index].length - 1
                                      ? "50%"
                                      : "100%",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    index1 + 1 <
                                    script.AnswerUrls[index].length
                                  ) {
                                    setIndex1(index1 + 1);
                                  }
                                }}
                              >
                                Next Image
                              </button>
                            </div>
                          </div>
                          {/* {script.AnswerUrls[index].map((answerurl, k) => (
                            <img src={answerurl} width="80%" height="100%" />
                          ))} */}
                        </div>
                      </div>

                      <button
                        style={{ marginBottom: "12.5px" }}
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </Box>
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Scripts Not Found</div>
      )}
    </div>
  );
}

export default ShowScripts;
