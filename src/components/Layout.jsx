import { Outlet } from "react-router-dom";
import AppBar from "./AppBar/AppBar.jsx";

const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default Layout;
