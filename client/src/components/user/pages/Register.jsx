/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  SendOtpHandler,
  UserRegisterHandler,
} from "../../../redux/slice/UserThunk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, process, otpProcess } = useSelector(
    (state) => state.userStore
  );
  const [passShow, setPassShow] = useState(false);

  useEffect(() => {
    if (process) {
      navigate("/login");
    }
  }, [process]);

  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    otp: "- - - - - -",
    pass: "",
    conPass: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // dispatch(UserRegisterHandler(data, { navigate }));
    dispatch(SendOtpHandler(data.email));
  };

  useEffect(() => {
    if (data.otp.length === 6) {
      dispatch(UserRegisterHandler(data, { navigate }));
    }
  }, [data.otp]);

  console.log("otpProcess", otpProcess);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">User Register</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            onChange={inputHandler}
            type="text"
            id="fullName"
            name="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Full Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            onChange={inputHandler}
            type="text"
            id="username"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={inputHandler}
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            Otp
          </label>
          <input
            onChange={inputHandler}
            type="text"
            id="otp"
            name="otp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={data.otp}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={inputHandler}
            type="password"
            id="password"
            name="pass"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              onChange={inputHandler}
              type={passShow ? "text" : "password"}
              id="confirmPassword"
              name="conPass"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
            />
            <div
              className="absolute top-1.5 right-2 text-2xl cursor-pointer text-black"
              onClick={() => setPassShow(!passShow)}
            >
              {passShow ? <BiSolidShow /> : <BiSolidHide />}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {loading || otpProcess ? (
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-[100px] h-[40px]">
              <div className="w-full h-full flex justify-center items-center">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-[100px] h-[40px]"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
