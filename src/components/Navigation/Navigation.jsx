import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";

const Navigation = () => {
  return (
    <div className={css.navigation}>
      <Logo />
      <div className={css.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="teachers"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Teachers
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
