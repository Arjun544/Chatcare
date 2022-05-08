import React from "react";
import { Modal } from "@nextui-org/react";
import { getConversationImages } from "../../../services/conversation_services";
import { useQuery } from "react-query";

const FullImageView = ({ image, isImageClicked, setIsImageClicked }) => {
  return (
    <Modal
      width="60%"
      closeButton
      blur
      aria-labelledby="modal-title"
      open={isImageClicked}
      onClose={(e) => {
        setIsImageClicked(false);
      }}
    >
      <div className="flex flex-col h-[600px]">
        <img src={image.url} alt="" className="h-full w-full object-contain" />
      </div>
    </Modal>
  );
};

export default FullImageView;
