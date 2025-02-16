import css from "./AppBar.module.css";
import Navigation from "../Navigation/Navigation.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import { selectUser } from "../../redux/user/selectors.js";
import { useSelector } from "react-redux";

const AppBar = () => {
  const user = useSelector(selectUser);

  return (
    <div className={css.appBar}>
      <Navigation />

      {user && <UserMenu />}
      {!user && <AuthNav />}
    </div>
  );
};

export default AppBar;
