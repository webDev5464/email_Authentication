/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import UserNavigation from "./layouts/UserNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserVerifyHandler } from "../../redux/slice/UserThunk";
import { resetOtpProcess } from "../../redux/slice/UserSlice";

export default function UserIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validUser } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(UserVerifyHandler());
    dispatch(resetOtpProcess(false))

    // if (validUser) {
    //   navigate("/");
    // } else {
    //   navigate("/login");
    // }
  }, []);

  return (
    <div className="h-[100vh]">
      <UserNavigation />
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
}
