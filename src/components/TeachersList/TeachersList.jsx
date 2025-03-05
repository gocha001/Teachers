import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/teachersOperations.js";
import {
  selectTeachers,
  selectTeachersError,
  selectTeachersIsLoading,
  selectTeachersPage,
  selectTeachersLastPage,
} from "../../redux/teachers/selectors.js";
import { resetTeachers } from "../../redux/teachers/teachersSlice.js";
import TeacherCard from "../TeacherCard/TeacherCard.jsx";
import css from "./TeachersList.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const TeachersList = () => {
  const dispatch = useDispatch();

  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectTeachersIsLoading);
  const error = useSelector(selectTeachersError);
  const page = useSelector(selectTeachersPage);
  const lastPage = useSelector(selectTeachersLastPage);
  const [scrTo, setSrcTo] = useState(1250);

  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchTeachers({ page }));
    scrollWindow();
    setSrcTo((prev) => prev + 1440);
  };

  const scrollWindow = () => {
    setTimeout(() => {
      window.scrollBy({
        top: scrTo,
        behavior: "smooth",
      });
    }, 500);
  };

  if (isLoading)
    return (
      <div className={css.loader}>
        <p>Loading...</p>
        <Loader />
      </div>
    );
  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.teachersList}>
      <ul className={css.cards}>
        {Array.isArray(teachers) &&
          teachers.map((teacher, index) => (
            <li key={index}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
      </ul>

      {!lastPage && !isLoading && (
        <button onClick={loadMore} className={css.btnLoadMore}>
          Завантажити ще
        </button>
      )}
    </div>
  );
};

export default TeachersList;
