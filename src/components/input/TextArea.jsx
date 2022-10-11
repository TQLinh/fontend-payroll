import React from "react";
import { useController } from "react-hook-form";

const TextArea = (props) => {
  const {
    type = "text",
    control,
    name,
    className = "",
    placeholder = "enter content here...",
    ...rest
    // error,
  } = props;
  const { field } = useController({ control, name, defaultValue: "" });

  return (
    <textarea
      {...field}
      {...rest}
      type={type}
      placeholder={placeholder}
      className={`w-full px-6 py-4 pr-16 text-sm font-medium transition-all border rounded-xl text-text1 placeholder:text-text4 h-[140px] border-text4 dark:text-white dark:bg-darkStroke ${className}`}
    ></textarea>
  );
};

export default TextArea;
