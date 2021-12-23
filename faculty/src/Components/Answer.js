import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import "../Styles/Test.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import store from "../store";
function Answer({ questionid, showuploads }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(0);
  const [success, setSuccess] = useState(null);
  const [fetched, setFetched] = useState(null);

  const { id } = useParams();

  function uploadSingleFile(e) {
    // setFile(file,[])
    // setDisplayImages(displayImages,[])
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setSuccess(null);
    setFetched(false);
    setDisplayImages(ImagesArray);
    setFile(e.target.files);
  }

  function upload(e) {
    e.preventDefault();
    const formData = new FormData();

    for (let index = 0; index < file.length; index++) {
      formData.append("files", file[index]);
    }

    axios
      .post(
        "http://192.168.29.67:5000/api/tests/upload/" +
          id +
          "/" +
          questionid +
          "/" +
          store.getState().auth.user.id,
        formData
      )
      .then((res) => {
        setSuccess(res.data.msg);
        setFetched(true);
      })
      .catch((err) => {
        setSuccess(false);
      });
  }

  useEffect(() => {
    setFile([]);
    setDisplayImages([]);
    setSuccess(null);
    setIndex(0);

    axios
      .get(
        "http://192.168.29.67:5000/api/tests/get/" +
          id +
          "/" +
          questionid +
          "/" +
          store.getState().auth.user.id
      )
      .then((res) => {
        setDisplayImages(res.data[0].AnswerUrls);
        setFetched(true);
      })
      .catch((err) => {});
  }, [id, questionid]);
  return (
    <div>
      {showuploads ? (
        <div className="uploadans">
          <input
            type="file"
            id="ansbtn"
            multiple
            hidden
            onChange={uploadSingleFile}
          ></input>
          <label for="ansbtn">Choose Files</label>
          <button
            onClick={(e) => {
              upload(e);
            }}
          >
            Upload
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="preview">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="box">
            <div className="horizontalbox">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index - 1 >= 0) {
                    setIndex(index - 1);
                  }
                }}
              >
                <AiFillCaretLeft size={25} color="white" />
              </button>
              <img
                alt={index}
                src={displayImages[index]}
                width="80%"
                height="100%"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index + 1 < displayImages.length) {
                    setIndex(index + 1);
                  }
                }}
              >
                <AiFillCaretRight size={25} color="white" />
              </button>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Close
            </button>
          </Box>
        </Modal>
      </div>

      <div>
        <div className="form-group preview">
          {displayImages.length > 0 ? (
            fetched ? (
              <button
                style={{ marginTop: "25px" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpen();
                }}
              >
                View Submission
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleOpen();
                }}
              >
                View Before Upload
              </button>
            )
          ) : (
            <></>
          )}
          {/* {displayImages.length > 0 &&
            displayImages.map((item, index) => {
              return (
                <div className="ansdiv" key={item}>
                  <img className="ansimage" src={item} alt="" />
                  <div>
                    <GrView
                      size={25}
                      color="blue"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpen();
                      }}
                    />
                    
                    {!fetched?<MdOutlineDeleteForever
                      color="red"
                      size={25}
                      onClick={() => deleteFile(index)}
                    />:<></>}
                  </div>
                </div>
              );
            })} */}
        </div>
        <h3 style={{ textAlign: "center" }}>
          {success !== false
            ? success
            : "Something Went Wrong Try Again or contact faculty"}
        </h3>
      </div>
    </div>
  );
}

export default Answer;
