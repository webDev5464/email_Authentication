/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLoginHandler } from "../../../redux/slice/UserThunk";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, process } = useSelector((state) => state.userStore);
  const [passShow, setPassShow] = useState(false);

  useEffect(() => {
    if (process) {
      navigate("/");
    }
  }, [process]);

  const [loginFormData, setLoginFormData] = useState({
    validationName: "",
    pass: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(UserLoginHandler(loginFormData));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">User Login</h2>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={formHandler}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username/Email
          </label>
          <input
            onChange={inputHandler}
            type="text"
            id="username"
            name="validationName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username/Email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              onChange={inputHandler}
              type={passShow ? "text" : "password"}
              id="password"
              name="pass"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            <div
              className="absolute top-1.5 right-2 text-2xl cursor-pointer text-black"
              onClick={() => setPassShow(!passShow)}
            >
              {passShow ? <BiSolidShow /> : <BiSolidHide />}
            </div>
          </div>
        </div>
        <div className="underline text-blue-800 text-center cursor-pointer active:text-red-500">
          <NavLink to={"/forgotPassword"}>Forget Password</NavLink>
        </div>
        <div className="flex items-center justify-between mt-3">
          {/* {loading ? (
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
              Login
            </button>
          )} */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-[100px] h-[40px]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
