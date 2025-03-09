import { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ children, onClose, isOpen }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div onClick={handleBackdropClick} className={css.modal}>
      <div className={css.modalContent}>
        <button onClick={onClose} className={css.closeBtn}>
          <svg width="40" height="40" className={css.closeIcon}>
            <use href="/close.xml#icon-x"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
