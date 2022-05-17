import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const LinkPreview = ({ url }) => {
  const {
    isLoading,
    data: preview,
    refetch,
    isError,
  } = useQuery(
    ["link preview", url],
    async () => {
      const response = await axios.post(
        `https://graph.facebook.com/v13.0/?scrap=true&id=${url}&access_token=${process.env.REACT_APP_FB_ACCESS_TOKEN}`
      );
      console.log("linnkkkkkk", response.data);
      return response.data;
    },
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return isLoading ? (
    <div className="flex h-32 w-52  items-center justify-center text-slate-500 tracking-wider text-sm font-semibold">
      Loading Link
    </div>
  ) : isError ? (
    <div className="flex h-32 w-52  items-center justify-center text-red-500 tracking-wider text-sm font-semibold">
      Could not fetch links :(
    </div>
  ) : (
    <a
      className="flex flex-col gap-2 items-start overflow-hidden"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={preview.image[0].url}
        alt={preview.title}
        className="h-32 w-full rounded-2xl"
      />
      <p className="text-black font-semibold tracking-wider text-sm line-clamp-1 ">
        {preview.title}
      </p>
      <p className="text-slate-500 font-semibold tracking-wider text-xs">
        {preview.url}
      </p>
    </a>
  );
};

export default LinkPreview;
