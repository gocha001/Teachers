import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/user/selectors";

const PrivateRoute = ({ component: Component, redirectTo }) => {
  const user = useSelector(selectUser);
  return user ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
