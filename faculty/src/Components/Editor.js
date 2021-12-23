import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";
import "../Styles/editor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextEditor = ({ onSubmit }) => {
  const [body, setBody] = useState("");
  const [mark, setMark] = useState(0);
  let { testid } = useParams();
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://192.168.29.67:5000/api/questions/upload", {
        marks: mark,
        question: body,
        examid: testid,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div class="form-group marginer">
        <span
          style={{
            backgroundColor: "#eef4ff",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          Enter Marks
        </span>
        <input
          class="form-field"
          type="text"
          value={mark}
          onChange={(e) => {
            setMark(e.target.value);
          }}
        />
      </div>
      <CKEditor
        // here's where we are using our custom adapter
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new UploadAdapter(loader);
          };
        }}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
      />
      <button
        className="marginer"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default TextEditor;
