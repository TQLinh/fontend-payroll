import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
const api = "http://localhost:8080/api/v1/users";
const UpdateStaff = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    // defaultValues: {
    //   fullname: "",
    //   overtimesalary: "",
    //   workday: "",
    //   advance: "",
    //   basicsalary: "",
    //   responsibilityallowance: "",
    //   lunchallowance: "",
    //   gasolineallowance: "",
    //   insurance: "",
    //   ngaytangca: "",
    // },
  });
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const categorisId = params.get("id");
  useEffect(() => {
    async function fetch() {
      const response = await axios.get(api);
      const data = response?.data.data;
      for (let i of data) {
        if (Number(i.id) === Number(categorisId)) {
          console.log("i: ", i);
          return reset(i);
        }
      }
    }
    fetch();
  }, [categorisId]);
  const handleUpdate = async (values) => {
    console.log("values: ", { ...values });
    try {
      await axios.put(`${api}/${categorisId}`, {
        ...values,
      });
      navigate("/");
      toast.success("update thành công :)");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div>
      <div className="block mt-3 text-center">
        <h1 className="text-3xl font-bold">Update nhân viên </h1>
      </div>
      <form
        autoComplete="off"
        className="p-10"
        onSubmit={handleSubmit(handleUpdate)}
      >
        <div className="grid grid-cols-3 gap-3">
          <Field>
            <Label>Tạm ứng:</Label>
            <Input
              name="advance"
              placeholder="nhập tiền tạm ứng"
              type="text"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Giờ làm thêm:</Label>
            <Input
              name="overtimesalary"
              placeholder="enter fullname"
              type="text"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>ngày công:</Label>
            <Input
              name="workday"
              placeholder="enter fullname"
              type="text"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field>
            <Label>Phụ cấp xăng xe:</Label>
            <Input
              name="gasolineallowance"
              placeholder="enter fullname"
              type="text"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Phụ cấp trách nghiệm:</Label>
            <Input
              name="responsibilityallowance"
              placeholder="enter fullname"
              type="text"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Phụ cấp ăn trưa:</Label>
            <Input
              name="lunchallowance"
              placeholder="enter fullname"
              type="text"
              control={control}
            ></Input>
          </Field>
        </div>
        <button type="submit" className="btn-submit">
          update
        </button>
      </form>
    </div>
  );
};

export default UpdateStaff;
