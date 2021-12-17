import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/Test.css";
import DOMPurify from "dompurify";
import axios from "axios";
import Answer from "./Answer";
import "../Styles/Test.css";

// var elem = document.documentElement;
function Test() {
  let { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tests/get/" + id)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const [fullscreen, setFullscreen] = useState(false);

  //   const goFullScreen = () => {
  //     if (elem.requestFullscreen) {
  //       elem.requestFullscreen();
  //     } else if (elem.webkitRequestFullscreen) {
  //       elem.webkitRequestFullscreen();
  //     } else if (elem.msRequestFullscreen) {
  //       elem.msRequestFullscreen();
  //     }
  //     setFullscreen(true);
  //   };

  //   const checkFullScreen = () => {
  //     if (window.innerHeight == window.screen.height) {
  //       setFullscreen(true);
  //     } else {
  //       setFullscreen(false);
  //     }
  //   };

  //   useEffect(() => {
  //     goFullScreen();
  //   }, []);

  //   useEffect(() => {
  //     document.addEventListener("fullscreenchange", checkFullScreen());
  //   }, []);

  return (
    <div className="test">
      {questions.length > 0 ? (
        <div className="testinner">
          <div className="navigator">
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index - 1 >= 0) {
                    setIndex(index - 1);
                  }
                }}

                style={{backgroundColor:index===0?'rgba(165, 42, 42,.5)':'rgb(165, 42, 42)'}}
              >
                Prev
              </button>
            </div>
            <div>
              <div>Marks: {questions[index].marks}</div>
              <div>Status: Not Submitted</div>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index + 1 < questions.length) {
                    setIndex(index + 1);
                    console.log(index);
                  }
                }}

                style={{backgroundColor:index===questions.length-1?'rgba(165, 42, 42,.5)':'rgb(165, 42, 42)'}}
              >
                Next
              </button>
            </div>
          </div>

          <div
            className="Question"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize((index+1)+". "+questions[index].question),
            }}
          ></div>
          <Answer id={questions[index]._id}/>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Test;
