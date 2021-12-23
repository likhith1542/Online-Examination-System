import React, { useState, useEffect, useRef } from "react";
import store from "./../store";
import Controls from './../Components/Controls';

const Participant = ({ participant,  
  handleAudioToggle,
  handleVideoToggle,
  toggleAudio,
  toggleVideo
 }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>{participant.identity}</h3>

        <video ref={videoRef} autoPlay={true} />
        <audio ref={audioRef} autoPlay={true} muted={muted} />

        {participant.identity === store.getState().auth.user.id ? (
          <Controls
            handleAudioToggle={handleAudioToggle}
            handleVideoToggle={handleVideoToggle}
            audio={toggleAudio}
            video={toggleVideo}
          />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMuted(!muted);
            }}
          >
            {muted ? "unmute" : "mute"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Participant;
