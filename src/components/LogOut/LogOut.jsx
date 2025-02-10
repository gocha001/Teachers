import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/userOperations.js";

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {

    dispatch(logoutUser());
  };

  return <button onClick={handleLogout}>Вийти</button>;
};

export default LogOut;
