import { Route, Router, Routes } from "react-router-dom";
import Home from "./Page/Home";
import LoginPage from "./Page/LoginPage";
import UpdateStaff from "./Page/UpdateStaff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/update" element={<UpdateStaff></UpdateStaff>}></Route>
    </Routes>
  );
}

export default App;
