import { useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { ResetPasswordHandler } from "../../../redux/slice/UserThunk";

export default function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);

  const [formData, setFormData] = useState({
    token,
    newPassword: "",
    confirmNewPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-[100vh]">
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Reset Password
          </h2>
          <form
            className="mt-8 space-y-6 text-black"
            onSubmit={(e) => {
              try {
                e.preventDefault();
                dispatch(ResetPasswordHandler(formData));
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            <div className="relative">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                onChange={inputHandler}
                id="new-password"
                name="newPassword"
                type={passShow ? "text" : "password"}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div
                className="absolute top-8 right-2 text-2xl cursor-pointer"
                onClick={() => setPassShow(!passShow)}
              >
                {passShow ? <BiSolidShow /> : <BiSolidHide />}
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                onChange={inputHandler}
                id="confirm-new-password"
                name="confirmNewPassword"
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>
          {/* {message && (
            <p className="mt-4 text-center text-red-500">{message}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
