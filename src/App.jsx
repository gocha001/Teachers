import { AuthProvider } from './context/AuthProvider';
import './App.css'
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import LogOut from './components/LogOut/LogOut';
import SaveTeachers from './components/SaveTeachers/SaveTeachers.jsx';
import TeachersList from './components/TeachersList/TeachersList.jsx';

function App() {
  

  return (
    <AuthProvider>
      <RegisterForm />
      <LoginForm />
      <LogOut />
      <SaveTeachers />
      <TeachersList />
    </AuthProvider>
  )
}

export default App
