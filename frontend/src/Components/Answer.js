import React,{useState,useEffect} from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import "../Styles/Test.css";

function Answer({id}) {

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = useState(0);
    
  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    console.log("file", file);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  useEffect(() => {
      setFile([])
  }, [id])
  return (
    <div>
      <div className="uploadans">
        <input
          type="file"
          id="ansbtn"
          multiple
          hidden
          onChange={uploadSingleFile}
        ></input>
        <label for="ansbtn">Choose Files for {id}</label>
      </div>
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
              <img src={file[index]} width="80%" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (index + 1 < file.length) {
                    setIndex(index + 1);
                    console.log(index);
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
          {file.length > 0 &&
            file.map((item, index) => {
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
                    <MdOutlineDeleteForever
                      color="red"
                      size={25}
                      onClick={() => deleteFile(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Answer;
