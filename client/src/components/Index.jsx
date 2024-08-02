import { Outlet } from "react-router-dom";
import PopupMessage from "./modules/PopupMessage";

export default function Index() {
  return (
    <div className="bg-black text-white">
      <Outlet />
      <PopupMessage />
    </div>
  );
}
