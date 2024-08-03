/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetMessage, resetReqProcess } from "../../redux/slice/UserSlice";

export default function PopupMessage() {
  const dispatch = useDispatch();
  const { resMessage, process, reqProcess } = useSelector(
    (state) => state.userStore
  );

  const successPopupController = {
    position: "bottom-right",
    autoClose: 2000,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const errorPopupController = {
    position: "bottom-right",
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    if (resMessage !== "") {
      // if (otpProcess) {
      //   toast.success(resMessage, successPopupController);
      // } else {
      //   if (process) {
      //     toast.success(resMessage, successPopupController);
      //   } else {
      //     toast.error(resMessage, errorPopupController);
      //   }
      // }

      if (process) {
        toast.success(resMessage, successPopupController);
      } else {
        toast.error(resMessage, errorPopupController);
      }

      setTimeout(() => {
        dispatch(resetMessage());
        dispatch(resetReqProcess());
      }, 500);
    }
  }, [resMessage, reqProcess]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      draggable
      theme="light"
    />
  );
}
