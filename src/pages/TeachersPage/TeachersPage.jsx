import TeachersList from "../../components/TeachersList/TeachersList"
import css from './TeachersPage.module.css' 

const TeachersPage = () => {
  return (
    <div className={css.teachersCont}>
      
      <TeachersList />
    </div>
  )
}

export default TeachersPage