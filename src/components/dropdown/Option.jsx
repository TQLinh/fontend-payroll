import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className={`flex items-center border-b border-slate-500 justify-between px-5 py-4 h-[50px] transition-all rounded-sm cursor-pointer bg-slate-100 hover:text-teal-500 ${props.className}`}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
