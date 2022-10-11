import { yupResolver } from "@hookform/resolvers/yup";
import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { useLogin } from "../context/login-Context";
const LoginPage = ({ children }) => {
  useEffect(() => {
    document.title = "payroll login";
  }, []);
  const schame = yup.object({
    email: yup
      .string()
      .email("plaese enter valid email")
      .matches(/^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/, {
        message: "Email không hợp lệ",
      })
      .required("please enter your email ..."),
    password: yup
      .string()
      .min(8, "Please enter at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Vui long Tối thiểu ít nhất một ký tự viết hoa, một ký tự viết thường, một số và một ký tự đặc biệt",
        }
      )
      .required("please enter your useName"),
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    // resolver: yupResolver(schame),
    mode: "onChange",
  });
  const { setValue } = useLogin();
  console.log("render");
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:8080/api/v1/user");
      console.log("response: ", response?.data.data);
      setUserList(response?.data.data);
    }
    fetch();
  }, []);
  const handleLognIn = async (values) => {
    console.log("values: ", values);
    const { email, password } = userList[0];
    if (values.email === email && values.password === password) {
      console.log("ok");
      setValue(userList[0]);
      navigate("/");
    } else {
      toast.error("sai tk");
    }
  };
  return (
    <div className="relative flex items-center min-h-screen m-auto overflow-hidden bg-black p-1x py-7">
      <div className="w-[400px] h-[400px] rounded-full absolute bg-[#d70b9d] overflow-hidden blur-[200px] rotate-45 top-4 right-4 "></div>
      <div className="w-[700px] h-[400px] rounded-full absolute bg-[#4abfeac7] opacity-90 blur-[200px] rotate-45 right-4 bottom-0 "></div>
      <div className="w-[600px] h-[400px] rounded-full absolute bg-[#cb0ded] opacity-80 blur-[300px] rotate-45 bottom-4 left-4 "></div>
      <div className="w-[150px] h-[150px] rounded-full absolute bg-gradient-to-tr from-[#876afcb1] to-[#7af8fac2] opacity-70 shadow-[0px_0px_30px_#0d97ed] rotate-45 top-4 left-4 "></div>
      <div className="max-w-[1000px] min-w-[300px] w-full relative  top-0 bg-[#ffffffc1] py-3x px-4x mx-auto rounded-xl overflow-hidden">
        <div className="w-[600px] h-[500px] rounded-full -z-0  absolute bg-[#68e6f7a7]  blur-[100px] -right-4x -top-4x "></div>
        <div className="w-[700px] h-[400px] overflow-hidden rounded-full absolute -z-0  bg-[#ff00d4a3] blur-[300px] -left-4x -bottom-4x "></div>
        <>
          <LogoWeb></LogoWeb>
        </>
        <div className="max-w-[500px] w-full mx-auto mt-1x">
          <form
            autoComplete="off"
            onSubmit={handleSubmit(handleLognIn)}
            className="relative mx-auto form "
          >
            <Field className="email">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="email"
                control={control}
                type="text"
              ></Input>
            </Field>

            <Field className="mt-4 password">
              <Label>Password </Label>
              <Input
                type="password"
                checkpass="true"
                placeholder="Enter password"
                name="password"
                control={control}
              ></Input>
            </Field>

            <div className="flex items-center mt-2 gap-x-1 have-account"></div>
            <Button type="submit">Logn in</Button>
            <div className="flex items-center justify-end mt-2x gap-x-1 have-account">
              <Link
                to={"/forgot-password"}
                className="flex items-center font-semibold gap-x-1 text-sky-600"
              >
                {/* <span> Forgot password</span> <IconQuestion></IconQuestion> */}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const LogoWeb = () => {
  return (
    <div className="relative z-20 flex items-center justify-center w-full gap-x-2 ">
      <div className="block w-6x h-6x">
        <img
          srcSet="/icons8-money-bag-100.png"
          alt="logo item "
          className="object-cover w-full h-full logo"
        />
      </div>
      <h1 className="relative z-20 text-2xl font-bold md:text-4xl logo">
        Login app payroll
      </h1>
    </div>
  );
};

export default LoginPage;
