import React from "react";
import toast from "react-hot-toast";

export const customToast = (message, onClick) =>
  toast((t) => (
    <div className="flex items-center gap-10">
      <h1 className="font-semibold tracking-wider text-black">{message}</h1>
      <button
        onClick={() => {
          toast.dismiss(t.id);
          onClick();
        }}
        className="bg-green-400 rounded-xl px-4 py-2 tracking-wider font-semibold hover:bg-green-300 hover:scale-95 transition-all duration-500 ease-in-out"
      >
        Upgrade
      </button>
    </div>
  ));
