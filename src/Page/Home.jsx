import Select from "../components/dropdown/Select";
import Label from "../components/label/Label";
import List from "../components/dropdown/List";
import Input from "../components/input/Input";
import Field from "../components/field/Field";
import Search from "../components/dropdown/Search";
import Option from "../components/dropdown/Option";
import Dropdown from "../components/dropdown/Dropdown";
import { listStaff, overtimes, selectLimit } from "../util/ListSelect";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLogin } from "../context/login-Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const api = "http://localhost:8080/api/v1/users";
const Home = () => {
  const navigate = useNavigate();
  const check = yup
    .string()
    .required("Vui lòng nhập đầy đủ")
    .max(12, "Không được nhập quá 12 số")
    .matches(/^(?!0*(\\.0+)?$)[0-9]{0,9}(\\.[0-9]{1,4})?$/, {
      message: "không được phép nhập số âm và chữ cái",
    });
  const schame = yup.object({
    overtimesalary: check,
    workday: check,
    advance: check,
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schame),
  });
  const [select, setSelect] = useState({});
  const [staffList, setStaffList] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [luongcb, setLuongcb] = useState();
  const [phucaptn, setPhucaptn] = useState();
  const [phucapat, setPhucapat] = useState();
  const [phucapxx, setPhucapxx] = useState();
  const [baohiem, setBaohiem] = useState();
  const { storedValue, setValue } = useLogin();
  const { email, fullname, role } = storedValue;
  const [showAdd, setShowAdd] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!staffList) return;
    setPageCount(Math.ceil(listUser.length / itemsPerPage));
  }, [staffList, itemOffset, itemsPerPage]);
  useEffect(() => {
    async function getAllStaff() {
      let response = await axios.get(`${api}`);
      setListUser(response?.data.data);
    }
    getAllStaff();
  }, [count]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % staffList.length;
    if (typeof newOffset === NaN) {
      return null;
    }
    setItemOffset(Number(newOffset));
    setPage(event.selected + 1);
  };
  const handleSelect = (value) => {
    setSelect(value);
  };
  const [find, setFind] = useState("");
  useEffect(() => {
    async function fetch() {
      try {
        if (find.length > 0) {
          const response = await axios.get(`${api}?search=${find}`);
          console.log("response?.data.data: ", response?.data.data);
          const data = response?.data.data;
          setStaffList(data);
        } else {
          const response = await axios.get(
            `${api}?page=${page}&limit=${itemsPerPage}`
          );
          const data = response?.data.data;
          setStaffList(data);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    fetch();
  }, [page, itemsPerPage, find, count]);
  const handleAddStaff = async (values) => {
    try {
      await axios.post(`${api}`, {
        ...values,
        fullname: name,
        basicsalary: luongcb,
        responsibilityallowance: phucaptn,
        lunchallowance: phucapat,
        gasolineallowance: phucapxx,
        insurance: baohiem,
        ngaytangca: select.id || 0,
      });
      toast.success("thêm nhân viên thành công");
      setShowAdd(false);
      // setLoad(() => load + 1);
      setCount(() => count + 1);
      reset({
        fullname: setName(""),
        overtimesalary: "",
        workday: "",
        advance: "",
        basicsalary: setLuongcb(),
        responsibilityallowance: setPhucaptn(),
        lunchallowance: setPhucapat(),
        gasolineallowance: setPhucapxx(),
        insurance: setBaohiem(),
        ngaytangca: setSelect("select ok"),
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${api}/${id}`);
        // setLoad(() => load - 1);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    setCount(() => count - 1);
  };
  const handleChangeSelect = (limit) => {
    setItemsPerPage(limit);
  };

  const handleSelectStaff = (data) => {
    setLuongcb(data.luongcoban);
    setName(data?.fullname);
    setPhucaptn(data?.phucaptn);
    setPhucapat(data?.phucapantru);
    setPhucapxx(data?.phucapxangxe);
    setBaohiem(data?.baohiem);
  };
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    function get() {
      const newData = listStaff?.filter((data) => {
        const list = data?.fullname.includes(search || "");
        return list;
      });
      setListSearch(newData);
    }
    get();
  }, [search]);

  if (!fullname) {
    return navigate("/login");
  }

  return (
    <>
      <div className="flex justify-between p-4 bg-gradient-to-tr from-blue-400 to-sky-600">
        <div className="relative z-20 flex items-center w-full gap-x-2 ">
          <div className="block w-10 h-10">
            <img
              srcSet="/icons8-money-bag-100.png"
              alt="logo item "
              className="object-cover w-full h-full logo"
            />
          </div>
          <h1 className="relative z-20 text-xl font-bold text-gray-200 logo">
            Login app payroll
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-900 rounded-md top-4 left-3 ">
          <div className="flex w-10 h-10 overflow-hidden rounded-full">
            <img
              src="https://images.unsplash.com/photo-1544860707-c352cc5a92e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
              alt=""
            />
          </div>
          <div className="flex flex-col flex-1 text-white">
            <span className="whitespace-nowrap">Fullname: {fullname}</span>
            <span>{role === 1 ? "Admin" : ""}</span>
          </div>
          <div
            className="p-1 bg-white rounded-md"
            onClick={() => {
              setValue({});
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="">
        <div
          className={` ${
            showAdd ? "scale-100" : "scale-0"
          } absolute inset-0 w-full min-h-full transition-all bg-[#5a5858e0] z-20`}
        >
          <span
            onClick={() => setShowAdd(false)}
            className="absolute flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full top-1 right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <form
            autoComplete="off"
            className={` absolute bg-white  py-10  px-40 top-2/4 w-full -translate-y-2/4`}
            onSubmit={handleSubmit(handleAddStaff)}
          >
            <div className="block mb-3 text-center">
              <h1 className="text-3xl font-semibold ">Thêm nhân viên:</h1>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field>
                <Label>full name:</Label>
                <Dropdown>
                  <Select
                    className="!border-2"
                    placeholder={name || "select staff..."}
                  ></Select>
                  <List>
                    <Search
                      onChange={(e) => handleChangeSearch(e)}
                      placeholder="enter fullname"
                    ></Search>
                    {listSearch.length > 0 &&
                      listSearch.map((item) => {
                        return (
                          <Option
                            className="!font-semibold"
                            onClick={() => handleSelectStaff(item)}
                            key={item.id}
                          >
                            {item.fullname}
                          </Option>
                        );
                      })}
                  </List>
                </Dropdown>
              </Field>
              <Field>
                <Label>Số giờ làm thêm:</Label>
                <Input
                  error={errors?.overtimesalary?.message}
                  name="overtimesalary"
                  placeholder={"Số giờ làm thêm..."}
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label>Ngày tăng ca:</Label>
                <Dropdown>
                  <Select
                    className="!border-2"
                    placeholder={select.content || "select ok"}
                  ></Select>
                  <List>
                    {overtimes.length > 0 &&
                      overtimes.map((item) => {
                        return (
                          <Option
                            onClick={() => handleSelect(item)}
                            key={item.id}
                          >
                            {item.content}
                          </Option>
                        );
                      })}
                  </List>
                </Dropdown>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3"></div>
            <div className="grid grid-cols-3 gap-3">
              <Field>
                <Label>Ngày công:</Label>
                <Input
                  error={errors?.workday?.message}
                  name="workday"
                  placeholder={"enter fullname..."}
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label>Tạm ứng:</Label>
                <Input
                  error={errors?.advance?.message}
                  name="advance"
                  placeholder={"enter fullname..."}
                  control={control}
                ></Input>
              </Field>
            </div>
            <button type="submit" className="btn-submit">
              Thêm nhân viên
            </button>
          </form>
        </div>
        <div className="flex items-baseline justify-around mt-4 gap-x-5">
          <h1 className="table-content">Bảng lương:</h1>
          <div className="flex items-center justify-between gap-5">
            <input
              onChange={(e) => setFind(e.target.value)}
              className="px-5 py-3 border-2 rounded-lg"
              name="search"
              placeholder={"Tìm kiếm nhân viên ..."}
            ></input>
            <div className="w-30">
              <Dropdown>
                <Select
                  className="!border-2 border-blue-300 text-sky-300"
                  placeholder={itemsPerPage || "select limit"}
                ></Select>
                <List>
                  {selectLimit.length > 0 &&
                    selectLimit.map((item, index) => {
                      return (
                        <Option
                          onClick={() => handleChangeSelect(item.limit)}
                          key={index}
                        >
                          {item.limit}
                        </Option>
                      );
                    })}
                </List>
              </Dropdown>
            </div>
            <button
              onClick={() => setShowAdd(!showAdd)}
              type="submit"
              className="flex h-full items-center bg-gradient-to-br text-white from-blue-500 to-sky-300 py-2  px-3 rounded-md text-base font-semibold  !w-max"
            >
              Thêm nhân viên
            </button>
          </div>
        </div>
        <table>
          <thead className="text-center text-white bg-sky-500">
            <tr>
              <th rowSpan="3">stt</th>
              <th rowSpan="3">MNV</th>
              <th rowSpan="3">fullName</th>
              <th rowSpan="3">Lương chính</th>
              <th colSpan="3" className="bg-sky-700">
                Phụ cấp
              </th>
              <th rowSpan="3">Ngày công</th>
              <th rowSpan="3">Tạm ứng</th>
              <th rowSpan="3">Số giờ tăng ca</th>
              <th rowSpan="3">Bảo hiểm</th>
              <th rowSpan="3">Thực lĩnh</th>
              <th rowSpan="3">active</th>
            </tr>
            <tr>
              <th>Tránh nghiệm</th>
              <th>Ăn trưa</th>
              <th>Xăng xe</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 &&
              staffList.reverse().map((item, index) => {
                const {
                  id,
                  fullname,
                  basicsalary,
                  responsibilityallowance,
                  lunchallowance,
                  gasolineallowance,
                  workday,
                  overtimesalary,
                  advance,
                  insurance,
                  ngaytangca,
                } = item;
                const luongcoban = (basicsalary / 28) * workday;
                const luongphucap =
                  responsibilityallowance + lunchallowance + gasolineallowance;
                const luong1ngay = luongcoban / workday;
                let lamthem = 0;
                if (ngaytangca === 1) lamthem = 1.5;
                else if (ngaytangca === 2) lamthem = 2;
                else if (ngaytangca === 3) lamthem = 3;

                const luongtangca = (luong1ngay / 8) * lamthem * overtimesalary;
                const thuclinh =
                  luongtangca + luongcoban + luongphucap - advance - insurance;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>NV{id}</td>
                    <td>{fullname}</td>
                    <td>{basicsalary}</td>
                    <td>{responsibilityallowance}</td>
                    <td>{lunchallowance}</td>
                    <td>{gasolineallowance}</td>
                    <td>{workday}</td>
                    <td>{advance}</td>
                    <td>{overtimesalary}</td>
                    <td>{insurance}</td>
                    <td>{thuclinh.toFixed(3)}</td>
                    <td className="flex justify-center gap-2 p-1 text-white rounded-md">
                      <span
                        onClick={() => handleDelete(id)}
                        className="p-1 rounded-md cursor-pointer bg-slate-800"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </span>
                      <span
                        className="p-1 rounded-md cursor-pointer bg-slate-800"
                        onClick={() => navigate(`/update?id=${id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className="paginetion"
          />
        </div>
        <div className="w-full h-24"></div>
      </div>
    </>
  );
};

export default Home;
