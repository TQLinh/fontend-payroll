import { useState, createContext, useContext } from "react";
import useLocalStorrage from "../hooks/useLocalStorrage";
const LoginContext = createContext();
function LoginProvider(props) {
  const [userLogin, setUserLogin] = useState({});
  const { storedValue, setValue } = useLocalStorrage("user", userLogin);
  // console.log("storedValue: ", storedValue);

  const value = { storedValue, setValue, setUserLogin };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
}

function useLogin() {
  const context = useContext(LoginContext);
  if (typeof context === "undefined") {
    throw new Error("lỗi use context");
  }
  return context;
}
export { LoginProvider, useLogin };
