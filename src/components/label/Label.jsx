import React from "react";
import PropTypes from "prop-types";
const Label = ({ children, className = "", htmlFor }) => {
  return (
    <label
      // htmlFor={htmlFor}
      className={`inline-block text-base font-medium cursor-pointer text-text2 ${className}`}
    >
      {children}
    </label>
  );
};
Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.node,
};

export default Label;
