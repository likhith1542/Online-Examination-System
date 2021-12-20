import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "./../store";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import "../Styles/createtest.css";
import axios from 'axios';
function CreateTest(props) {
  const [examName, setexamName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [marks, setMarks] = useState();
  const [date, setDate] = useState(Date.now());
  const [duration, setDuration] = useState();
  const [errors, setErrors] = useState();

  let navigate = useNavigate();

  useEffect(
    () => {
      if (props.errors) {
        setErrors(props.errors);
      }
    },
    // eslint-disable-next-line
    [props.errors]
  );

  const submitTestDet = (e) => {
    e.preventDefault();

    if (
      marks === "" ||
      date.toString() === "" ||
      courseName === "" ||
      examName === "" ||
      duration === ""
    ) {
      setErrors("Enter All Fields");
    } else {
      const testData = {
        marks: marks,
        examdate: date,
        coursename: courseName,
        examname: examName,
        status: "upcoming",
        duration: duration,
        faculty: store.getState().auth.user.id,
      };
      console.log(testData);
      axios
        .post("http://localhost:5000/api/tests/create", testData)
        .then((res) => {
          console.log(res);
          navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="login">
      <div className="card create">
        <h1>Create Test</h1>
        <input
          type={"text"}
          placeholder="Exam Name"
          value={examName}
          onChange={(e) => {
            e.preventDefault();
            setexamName(e.target.value);
          }}
        />

        <input
          type={"text"}
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => {
            e.preventDefault();
            setCourseName(e.target.value);
          }}
        />

        <input
          type={"number"}
          placeholder="Marks"
          value={marks}
          onChange={(e) => {
            e.preventDefault();
            setMarks(e.target.value);
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={date.toString()}
            onChange={(e) => {
              setDate(e);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <input
          type={"text"}
          placeholder="Exam Duration (in Minutes)"
          value={duration}
          onChange={(e) => {
            e.preventDefault();
            setDuration(e.target.value);
          }}
        />

        <span className="red-text" style={{ color: "red" }}>
          {errors}
        </span>

        <button
          onClick={(e) => {
            submitTestDet(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateTest;
