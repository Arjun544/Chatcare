import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { isValidHttpUrl } from "../../../helpers/isValidHttpUrl";
import { getConversationAttachments } from "../../../services/conversation_services";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import LinkPreview from "@ashwamegh/react-link-preview";
import { PreviewLinkComponent } from "../../../components/LinkPreview";

const AttachmentsDetails = ({
  conversationId,
  currentFiles,
  setIsFilesOpen,
}) => {
  const {
    isLoading: isLoading,
    data: files,
    refetch: refetch,
    isError: isError,
  } = useQuery(
    ["attachment files", currentFiles],
    async () => {
      const response = await getConversationAttachments(
        conversationId,
        currentFiles
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
    <div className="w-2/12 bg-white flex flex-col my-6 gap-4 px-6 transition-all duration-500 ease-in-out overflow-hidden">
      <div className="flex items-start gap-4 w-full">
        <RiArrowLeftSLine
          onClick={(e) => setIsFilesOpen(false)}
          size={25}
          className="cursor-pointer"
        />
        <h1 className="text-black font-semibold tracking-wider capitalize">
          {currentFiles}
        </h1>
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div
          className={`flex flex-col h-full w-full gap-4 overflow-x-auto ${
            currentFiles === "media" && "grid grid-cols-3 gap-4 content-start"
          }`}
        >
          {files.map((file) =>
            file.type === "png" ? (
              <img
                src={file.url}
                alt="media"
                className="h-20 w-20 object-cover rounded-lgmt-10 bg-white"
              />
            ) : file.text ? (
              isValidHttpUrl(file.text) && (
                <a
                  href={file.text}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 p-4 rounded-xl hover:bg-slate-100"
                >
                  <LinkPreview url={file.text} render={PreviewLinkComponent} />
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
