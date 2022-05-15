import React from "react";

export function PreviewLinkComponent({ loading, preview }) {
  return loading ? (
    <div className="flex items-center justify-center h-32 w-52 text-slate-500 tracking-wider font-semibold text-sm">
      Loading link
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <img
        src={preview.img}
        alt={preview.title}
        className="h-32 w-full rounded-2xl"
      />
      <p className="text-black font-semibold tracking-wider text-sm line-clamp-1 overflow-ellipsis">
        {preview.title}
      </p>
      <p className="text-slate-500 font-semibold tracking-wider text-xs">
        {preview.domain}
      </p>
    </div>
  );
};
