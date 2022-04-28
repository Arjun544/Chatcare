import React, { useEffect, useState } from "react";
import { Modal } from "@nextui-org/react";
import { RiMicFill } from "react-icons/ri";
import PermissionDialogue from "../../../components/PermissionDialogue.";

const AudioDialogue = ({ isAudioDialogueOpen, setIsAudioDialogueOpen }) => {
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [recordStatus, setRecordStatus] = useState("idle");
  // const Mp3Recorder = MicRecorder({ bitRate: 128 });

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setHasAudioPermission(true);
      },
      () => {
        console.log("Permission Denied");
        hasAudioPermission(false);
      }
    );
  }, []);

  const handleRecord = (e) => {
    e.preventDefault();
    switch (recordStatus) {
      case "idle":
        setRecordStatus("recording");

        break;
      case "recording":
        setRecordStatus("stop");
        break;
      case "stop":
        setRecordStatus("recording");
        break;
      default:
        break;
    }
  };

  if (!hasAudioPermission) {
    return (
      <PermissionDialogue
        message="You haven't allowed Chatcare to access to your microphone"
        isAudioDialogueOpen={isAudioDialogueOpen}
        setIsAudioDialogueOpen={setIsAudioDialogueOpen}
      />
    );
  }

  return (
    <Modal
      width="40%"
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isAudioDialogueOpen}
      onClose={(e) => {
        setRecordStatus("idle");
        setIsAudioDialogueOpen(false);
      }}
    >
      <h1 className="text-black tracking-wider font-semibold">
        Record a message
      </h1>
      {recordStatus === "idle" && (
        <h1 className="text-slate-300 text-sm tracking-wider font-semibold">
          Start recording
        </h1>
      )}
      <div className="flex flex-grow items-center justify-center px-4 h-60 my-8 gap-4">
        {recordStatus !== "stop" ? (
          <>
            <div
              onClick={(e) => handleRecord(e)}
              className={`flex items-center justify-center rounded-full transition-all duration-500 ease-in-out ${
                recordStatus === "recording"
                  ? "bg-red-100 hover:bg-red-200 animate-pulse"
                  : "bg-green-100 hover:bg-green-200"
              }`}
            >
              <RiMicFill
                className={`h-20 w-20 m-8 ${
                  recordStatus === "recording"
                    ? "fill-red-300"
                    : "fill-green-300"
                }`}
              />
            </div>
            {recordStatus === "recording" && (
              <h1 className="text-slate-400 tracking-widest font-semibold animate-pulse">
                Listening...
              </h1>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center w-1/2 h-fit gap-20">
            <audio
              src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3?_=1"
              autoPlay
              controls
              className="w-full h-10 bg-white"
            ></audio>
            <div className="flex justify-center items-center w-full gap-4">
              <button className="bg-green-400 rounded-2xl w-1/2 h-12 text-white tracking-widest font-semibold hover:bg-green-300 hover:scale-95 transition-all duration-500 ease-in-out">
                Send
              </button>
              <button
                onClick={(e) => setRecordStatus("idle")}
                className="text-red-400 rounded-2xl w-1/3 h-12 tracking-wider font-semibold hover:text-red-300 hover:scale-95 transition-all duration-500 ease-in-out"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AudioDialogue;
