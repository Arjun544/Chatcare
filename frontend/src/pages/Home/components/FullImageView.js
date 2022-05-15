import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import { getConversationAttachments } from "../../../services/conversation_services";
import { useQuery } from "react-query";

const FullImageView = ({
  image,
  conversationId,
  isImageClicked,
  setIsImageClicked,
}) => {
  const [selectedImage, setSelectedImage] = useState(image);

  const {
    isLoading: isLoading,
    data: images,
    refetch: refetch,
    isError: isError,
  } = useQuery(
    ["convo images"],
    async () => {
      const response = await getConversationAttachments(
        conversationId,
        "media"
      );
      return response.data.attachments;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

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
      <div className="flex flex-col items-center justify-center h-[600px]">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <p className="tracking-wider text-slate-400">
            Could not fetch images
          </p>
        ) : (
          <div className="flex flex-col items-center ">
            <img
              src={selectedImage.url}
              alt="image"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-5 flex items-center justify-center w-fit h-20 bg-slate-300 rounded-2xl gap-4 p-4">
              {images
                .filter((item) => item.type === "png")
                .map((image) => (
                  <img
                    key={image.id}
                    onClick={(e) => setSelectedImage(image)}
                    src={image.url}
                    alt="image"
                    className={`h-12 w-12 object-cover cursor-pointer rounded-2xl ${
                      image.id === selectedImage.id
                        ? "opacity-100"
                        : "opacity-25"
                    }`}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FullImageView;
