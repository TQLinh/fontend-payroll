import React from "react";
import { useDropdown } from "./dropdown-context";
import PropTypes from "prop-types";
const Select = ({ placeholder = "", className = "" }) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`flex font-medium items-center justify-between px-6 py-4 bg-white border rounded-xl cursor-pointer text-sm text-text4 border-text4 ${className}`}
      onClick={toggle}
    >
      <span className="capitalize">{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};
Select.propTypes = {
  placeholder: PropTypes.node,
  className: PropTypes.string,
};
export default Select;
