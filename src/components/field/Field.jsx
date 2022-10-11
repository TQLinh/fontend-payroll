import React from "react";
import PropTypes from "prop-types";
const Field = (props) => {
  const { children, className = "" } = props;

  return (
    <div
      className={`relative flex flex-col mb-4 lg:mb-5 gap-y-2 lg:gap-y-3 ${className}`}
    >
      {children}
    </div>
  );
};
Field.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Field;
