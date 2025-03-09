import css from "./AutNav.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";

const AuthNav = () => {
  const [isOpenLog, setIsOpenLog] = useState(false);
  const [isOpenReg, setIsOpenReg] = useState(false);

  const logIn = () => {
    setIsOpenLog(true);
  };

  const register = () => {
    setIsOpenReg(true);
  };

  const closeModalLog = () => {
    setIsOpenLog(false);
  };

  const closeModalReg = () => {
    setIsOpenReg(false);
  };

  return (
    <div className={css.authNav}>
      <button className={css.logInBtn} type="button" onClick={logIn}>
        <svg width="28" height="28">
          <use href="/login.xml#icon-log-in-01" />
        </svg>
        <p className={css.logInBtnText}>Log in</p>
      </button>
      <button className={css.registerBtn} type="button" onClick={register}>
        Registration
      </button>
      {isOpenLog && (
        <Modal onClose={closeModalLog} isOpen={isOpenLog}>
          <LoginForm onClose={closeModalLog} />
        </Modal>
      )}
      {isOpenReg && (
        <Modal onClose={closeModalReg} isOpen={isOpenReg}>
          <RegisterForm onClose={closeModalReg} />
        </Modal>
      )}
    </div>
  );
};

export default AuthNav;
