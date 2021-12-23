import React from "react";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";
// import Mic from "../assets/icons/microphone.svg";
// import MicOff from "../assets/icons/mute.svg";
// import Video from "../assets/icons/video-camera.svg";
// import VideoOff from "../assets/icons/no-video.svg";
// import End from "../assets/icons/end.svg";

const Controls = ({ handleAudioToggle, handleVideoToggle, audio, video }) => {
  return (
    <div style={{display:'flex',alignItems:'center',marginTop:'10px'}} >
      <div onClick={handleAudioToggle}>
        {audio ? <BsFillMicFill size={25} color="white" /> : <BsFillMicMuteFill size={25} color="white" />}
      </div>
      
      <div onClick={handleVideoToggle} style={{marginLeft:'25px'}} >
        {video ? <BsCameraVideoFill size={25} color="white" /> : <BsCameraVideoOffFill size={25} color="white" />}
      </div>
    </div>
  );
};

export default Controls;
