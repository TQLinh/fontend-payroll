import { Link } from "react-router-dom";

const Button = ({ children, to, classname, ...rest }) => {
  if (to) {
    return (
      <Link to={to}>
        {" "}
        <button
          className={`py-3 w-full text-white rounded-md text-xl font-semibold bg-gradient-to-tr from-purple-600 to-sky-400 mb-10 ${classname}`}
        >
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button
      {...rest}
      className={`py-3 w-full text-white rounded-md text-xl font-semibold bg-gradient-to-tr from-purple-600 to-sky-400 mb-10 ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
