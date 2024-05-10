import { motion } from "framer-motion";
import { useState } from "react";
import { FiUser , FiMic } from "react-icons/fi";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const Toggle = ({ selected, setSelected }) => {

  return (
    <div
    >
      <SliderToggle selected={selected} setSelected={setSelected} />
    </div>
  );
};

export const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "users" ? "text-white" : "text-slate-900"
        }`}
        onClick={() => {
          setSelected("users");
        }}
      >
        <FiUser className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Users</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "artist" ? "text-white" : "text-slate-900"
        }`}
        onClick={() => {
          setSelected("artist");
        }}
      >
        <FiMic className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Artist</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "artist" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default Toggle;