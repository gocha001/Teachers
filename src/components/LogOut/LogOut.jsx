import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/userOperations.js";
import css from "./LogOut.module.css";

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <button onClick={handleLogout} className={css.btn}>
      <div className={css.icons}>
        <svg width="16" height="16" className={css.icon}>
          <use href="/logout.xml#icon-Icon" />
        </svg>
        <svg width="10" height="28">
          <use href="/logout.xml#icon-Accent" />
        </svg>
      </div>
      <p className={css.text}>Log out</p>
    </button>
  );
};

export default LogOut;
