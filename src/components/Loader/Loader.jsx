import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <CircleLoader color="#21cd7a" size={100} speedMultiplier={0} />
    </div>
  );
};

export default Loader;
