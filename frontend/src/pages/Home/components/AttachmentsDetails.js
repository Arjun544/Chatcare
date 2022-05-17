import React, { useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { isValidHttpUrl } from "../../../helpers/isValidHttpUrl";
import { getConversationAttachments } from "../../../services/conversation_services";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { RotateSpinner } from "react-spinners-kit";
import LinkPreview from "../../../components/LinkPreview";
import FullImageView from "./FullImageView";

const AttachmentsDetails = ({
  conversationId,
  currentFiles,
  setIsFilesOpen,
}) => {
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const {
    isLoading,
    data: files,
    isError,
  } = useQuery(
    ["attachment files", conversationId, currentFiles],
    async () => {
      const response = await getConversationAttachments(
        conversationId,
        currentFiles
      );
      console.log(response.data.attachments);
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
    <div className="w-2/12 bg-white flex flex-col my-6 gap-4 px-6 transition-all duration-500 ease-in-out overflow-hidden">
      <div className="flex items-start gap-4 w-full">
        <RiArrowLeftSLine
          onClick={(e) => setIsFilesOpen(false)}
          size={25}
          className="cursor-pointer"
        />
        <div className="flex">
          <h1 className="text-black font-semibold tracking-wider capitalize">
            {currentFiles} ({files?.length})
          </h1>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-20">
          <RotateSpinner sty size={30} color="#44C7F4" loading={isLoading} />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center mt-20 tracking-wider font-semibold text-slate-400">
          Could not fetch data
        </div>
      ) : files.length === 0 ? (
        <div className="flex items-center justify-center mt-20 tracking-wider font-semibold text-slate-400">
          No {currentFiles} found
        </div>
      ) : (
        <div
          className={`flex flex-col h-full w-full gap-4 overflow-x-auto ${
            currentFiles === "images" && "grid grid-cols-3 gap-4 content-start"
          }`}
        >
          {files.map((file) =>
            file.type === "png" ? (
              <div key={file.id}>
                {/* Full Message Image view */}
                {isImageClicked && (
                  <FullImageView
                    image={selectedImage}
                    conversationId={conversationId}
                    isImageClicked={isImageClicked}
                    setIsImageClicked={setIsImageClicked}
                  />
                )}
                <img
                  onClick={(e) => {
                    setSelectedImage(file);
                    setIsImageClicked(true);
                  }}
                  src={file.url}
                  alt="media"
                  className="h-20 w-20 object-cover rounded-lg bg-white cursor-pointer"
                />
              </div>
            ) : file.type === "video" ? (
              <video
                key={file.id}
                src={file.url}
                className="rounded-xl"
                controls
              ></video>
            ) : file.type === "audio" ? (
              <audio
                key={file.id}
                src={file.url}
                className="rounded-xl"
                controls
              ></audio>
            ) : file.text ? (
              isValidHttpUrl(file.text) && (
                <a
                  key={file.id}
                  href={file.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 p-4 rounded-xl hover:bg-slate-100"
                >
                  <LinkPreview url={file.text} />
                </a>
              )
            ) : (
              <a
                key={file.id}
                href={file.type === "pdf" ? file.url : "false"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl gap-2 bg-slate-300 h-12 text-xs font-semibold tracking-wider cursor-pointer hover:scale-95 transition-all duration-400 ease-in-out"
              >
                <BsFileEarmarkMedicalFill size={19} />
                {file.name}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AttachmentsDetails;
