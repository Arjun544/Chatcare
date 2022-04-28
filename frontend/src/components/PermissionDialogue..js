import React from "react";
import { Modal } from "@nextui-org/react";

const PermissionDialogue = ({
  isAudioDialogueOpen,
  setIsAudioDialogueOpen,
  message,
}) => {
  return (
    <Modal
      width="40%"
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isAudioDialogueOpen}
      onClose={(e) => {
        setIsAudioDialogueOpen(false);
      }}
    >
      <h1 className="text-black font-semibold tracking-wider mb-4"> {message}</h1>
    </Modal>
  );
};

export default PermissionDialogue;
