import React from "react";
import { useDropdown } from "./dropdown-context";
import PropTypes from "prop-types";
const List = ({ children, className }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div
          className={`absolute left-0 w-full z-[1] bg-white shadow-sm top-full max-h-[250px] overflow-auto ${className}`}
        >
          {children}
        </div>
      )}
    </>
  );
};
List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
export default List;
