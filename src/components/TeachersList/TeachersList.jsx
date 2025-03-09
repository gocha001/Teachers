import { useEffect, useRef } from "react";
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
  const prevScrollY = useRef(0);

  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const loadMore = () => {
    prevScrollY.current = window.scrollY + 620;
    dispatch(fetchTeachers({ page }));
  };

  useEffect(() => {
    window.scrollTo({
      top: prevScrollY.current,
      behavior: "instant",
    });
  }, [teachers]);

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
          teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
      </ul>

      {!lastPage && !isLoading && (
        <button onClick={loadMore} className={css.btnLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TeachersList;
