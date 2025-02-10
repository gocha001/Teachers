import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/teachersOperations.js";
import { selectTeachers, selectTeachersError, selectTeachersIsLoading } from "../../redux/teachers/selectors.js";

const TeachersList = () => {
    const dispatch = useDispatch();
    
    const teachers = useSelector(selectTeachers);
    const isLoading = useSelector(selectTeachersIsLoading);
    const error = useSelector(selectTeachersError);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div>
      <h2>Список вчителів</h2>
      <ul>
        {teachers &&
          Object.keys(teachers).map((key) => (
            <li key={key}>{teachers[key].name}</li>
          ))}
      </ul>
    </div>
  );
};

export default TeachersList;
