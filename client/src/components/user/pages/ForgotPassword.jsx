import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserResetPasswordRequest } from "../../../redux/slice/UserThunk";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userStore);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UserResetPasswordRequest({ email }));
  };

  return (
    <div className="flex items-center justify-center text-white bg-black mt-10">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-black">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            {loading ? (
              <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-full h-[40px]">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="loader"></div>
                </div>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline active:scale-95 w-full h-[40px]"
              >
                Send Reset Link
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
