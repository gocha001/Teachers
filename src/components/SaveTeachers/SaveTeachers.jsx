import { saveTeachers } from "../../redux/teachers/teachersOperations.js";
import data from "../../data/data.json";
import { useDispatch } from "react-redux";

const SaveButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveTeachers(data));
  };

  return <button onClick={handleClick}>Завантажити дані</button>;
};

export default SaveButton;
