import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserLogoutHandler } from "../../../redux/slice/UserThunk";

export default function UserNavigation() {
  const { validUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  return (
    <nav className="bg-slate-800 text-white flex items-center justify-between px-40 max-[800px]:px-10 max-[600px]:px-2 py-3">
      <div className="text-2xl font-bold">
        <h3>Auth</h3>
      </div>

      <div className="flex gap-5">
        <ul className="flex gap-5 font-bold text-xl">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li className={validUser ? "hidden" : "block"}>
            <NavLink to={"register"}>Register</NavLink>
          </li>
          <li className={validUser ? "hidden" : "block"}>
            <NavLink to={"login"}>Login</NavLink>
          </li>
        </ul>

        <button
          className={validUser ? "block font-bold text-xl" : "hidden"}
          onClick={() => dispatch(UserLogoutHandler())}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
