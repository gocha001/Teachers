import { useState } from "react";
import css from "./TeacherCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import {
  addFavorite,
  deleteFavorite,
} from "../../redux/favorites/favoritesOperations";
import { selectTeachersFavorites } from "../../redux/favorites/selectors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Modal/Modal";
import BookTrialLesson from "../BookTrialLesson/BookTrialLesson";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites = useSelector(selectTeachersFavorites);
  const [more, setMore] = useState(false);
  const love = favorites.some((fav) => fav.id === teacher.id);
  const [isOpenTrial, setIsOpenTrial] = useState(false);

  const handleLove = () => {
    if (!user) {
      toast.info("Please log in or sign up to continue", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    const teacherWithUid = { ...teacher, uid: user.uid };

    if (!love) {
      dispatch(addFavorite(teacherWithUid));
    } else {
      dispatch(deleteFavorite(teacher.id));
    }
  };

  const handleMore = () => {
    setMore(!more);
  };

  const handleTrial = () => {
    setIsOpenTrial(true);
  };
  const closeModalTrial = () => {
    setIsOpenTrial(false);
  };

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <img src={teacher.avatar_url} className={css.avatarImage} />
        <svg width="12" height="12" className={css.avatarSvg}>
          <use href="/group.xml#icon-Group-82" />
        </svg>
      </div>
      <div className={css.cardContainer}>
        <div className={css.cardContent}>
          <div className={css.cardInfo}>
            <div className={css.cardHeader}>
              <div className={css.cardNameCont}>
                <h4 className={css.cardNameTitle}>Languages</h4>
                <h2 className={css.cardName}>
                  {teacher.name} {teacher.surname}
                </h2>
              </div>
              <div className={css.cardItemsLove}>
                <div className={css.cardItems}>
                  <div className={css.cardOnline}>
                    <svg className={css.bookOpen} width="16" height="16">
                      <use href="/book-open.xml#icon-book-open-01" />
                    </svg>
                    <h3 className={css.online}>Lessons online</h3>
                  </div>
                  <svg
                    width="1"
                    height="16"
                    viewBox="0 0 1 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="rgba(18, 20, 23, 0.4)" d="M1 0v32" />
                  </svg>
                  <div className={css.done}>
                    <h3 className={css.online}>
                      Lessons done: {teacher.lessons_done}
                    </h3>
                  </div>
                  <svg
                    width="1"
                    height="16"
                    viewBox="0 0 1 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="rgba(18, 20, 23, 0.4)" d="M1 0v32" />
                  </svg>
                  <div className={css.rating}>
                    <svg width="16" height="16">
                      <use href="/star.xml#icon-star" />
                    </svg>
                    <h3 className={css.online}>Rating: {teacher.rating}</h3>
                  </div>
                  <svg
                    width="1"
                    height="16"
                    viewBox="0 0 1 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="rgba(18, 20, 23, 0.4)" d="M1 0v32" />
                  </svg>
                  <div className={css.price}>
                    <h3 className={css.online}>
                      Price / 1 hour:{" "}
                      <span className={css.span}>
                        {teacher.price_per_hour}$
                      </span>
                    </h3>
                  </div>
                </div>
                <div className={css.cardLove}>
                  <button
                    type="button"
                    onClick={handleLove}
                    className={css.btnLove}
                  >
                    {!love && (
                      <svg width="26" height="26" className={css.loveNormal}>
                        <use href="/love.xml#icon-normal" />
                      </svg>
                    )}
                    {love && (
                      <svg width="26" height="26">
                        <use href="/love.xml#icon-hover" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className={css.cardBlock}>
              <p className={css.blockTitle}>
                Speaks:
                <span
                  className={`${css.blockTitle} ${css.blockItem} ${css.decor}`}
                >
                  {teacher.languages.join(", ")}
                </span>
              </p>
              <p className={css.blockTitle}>
                Lesson Info:
                <span className={`${css.blockTitle} ${css.blockItem}`}>
                  {teacher.lesson_info}
                </span>
              </p>
              <p className={css.blockTitle}>
                Conditions:
                <span className={`${css.blockTitle} ${css.blockItem}`}>
                  {teacher.conditions.join(" ")}
                </span>
              </p>
            </div>
            {more && <p className={css.text}>{teacher.experience}</p>}
            {more && (
              <ul className={css.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li key={index} className={css.review}>
                    <div className={css.user}>
                      <div className={css.userImage}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div className={css.userNameBlock}>
                        <h3 className={css.userName}>{review.reviewer_name}</h3>
                        <div className={css.userRating}>
                          <svg width="16" height="16">
                            <use href="/star.xml#icon-star" />
                          </svg>
                          <p className={css.userRatingText}>
                            {review.reviewer_rating.toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className={css.reviewText}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" onClick={handleMore} className={css.btnMore}>
            {!more && <p>Read more</p>}
            {more && <p>Read less</p>}
          </button>
        </div>
        <ul className={css.levels}>
          {teacher.levels.map((level, index) => (
            <li key={index} className={css.level}>
              #{level}
            </li>
          ))}
        </ul>
        {more && (
          <button type="button" onClick={handleTrial} className={css.btnTrial}>
            Book trial lesson
          </button>
        )}
        {isOpenTrial && (
          <Modal onClose={closeModalTrial} isOpen={isOpenTrial}>
            <BookTrialLesson onClose={closeModalTrial} teacher={teacher} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
