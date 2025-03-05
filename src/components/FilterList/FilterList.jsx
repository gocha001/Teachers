import { useDispatch, useSelector } from "react-redux";
import { fetchFilterTeachers } from "../../redux/filter/filterOperations";
import {
  selectFilterTeachers,
  selectFilterLoading,
  selectFilterError,
} from "../../redux/filter/selectors";
import TeacherCard from "../TeacherCard/TeacherCard";
import css from "./FilterList.module.css";

const FilterList = () => {
  const teachers = useSelector(selectFilterTeachers);
  const isLoading = useSelector(selectFilterLoading);
  const error = useSelector(selectFilterError);

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div>
      <ul className={css.cards}>
        {Array.isArray(teachers) &&
          teachers.map((teacher, index) => (
            <li key={index}>
              {/* {index + 1}.{" "} */}
              {/* {teacher.name} */}
              <TeacherCard teacher={teacher} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterList;
