import TeachersList from "../../components/TeachersList/TeachersList";
import css from "./TeachersPage.module.css";
import SearchForm from "../../components/SearchForm/SearchForm";
// import SaveTeachers from "../../components/SaveTeachers/SaveTeachers";

const TeachersPage = () => {
  return (
    <div className={css.teachersCont}>
      <SearchForm />
      <TeachersList />
    </div>
  );
};

export default TeachersPage;
