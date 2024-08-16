/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  RegisterSuccessfullyHandler,
  RegisterValidation,
} from "../../../redux/slice/UserThunk";
import { useState, useRef, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import {
  resetOtpProcess,
  resetOtpValidation,
} from "../../../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";

const OtpInput = ({ length, onChangeOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input box if a number is entered
    if (value !== "" && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Update the OTP in the parent component
    onChangeOtp(newOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").split("");
    if (pasteData.length === length) {
      setOtp(pasteData);
      inputs.current[length - 1].focus();
      onChangeOtp(pasteData.join(""));
    }
  };

  return (
    <div onPaste={handlePaste} className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          className="w-12 h-12 text-center text-xl border rounded-md shadow focus:outline-none focus:border-blue-500 text-black"
        />
      ))}
    </div>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, process, otpValidation, otpProcess } = useSelector(
    (state) => state.userStore
  );
  const [passShow, setPassShow] = useState(false);
  const [otp, setOtp] = useState("");

  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    pass: "",
    conPass: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (otpProcess) {
      // dispatch(OtpVerification({ ...data, otp }));
      dispatch(RegisterSuccessfullyHandler({ ...data, otp }));
    } else {
      dispatch(RegisterValidation(data));
    }
  };

  useEffect(() => {
    if (otpValidation) {
      dispatch(resetOtpProcess(false));
      navigate("/login");

      setTimeout(() => {
        dispatch(resetOtpValidation());
      }, 500);
    }
  }, [process]);

  return (
    <div className="max-w-md mx-auto mt-10">
      {otpProcess ? (
        <div className="relative border p-5 bg-white text-black">
          <div
            className="absolute right-1 top-1 text-2xl cursor-pointer active:scale-95"
            onClick={() => dispatch(resetOtpProcess(false))}
          >
            <MdCancel />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-5 text-center">
              OTP Verification
            </h2>
            <form>
              <OtpInput length={6} onChangeOtp={setOtp} />
              <div className="flex items-center justify-between mt-4">
                {loading ? (
                  <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-[100px] h-[40px]">
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={formSubmitHandler}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-[150px] h-[40px] m-auto"
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
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
              {loading ? (
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
        </>
      )}
    </div>
  );
};

export default Register;
