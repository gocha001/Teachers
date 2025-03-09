import defaultImg from "/notFound.png";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      <img src={defaultImg} />
    </div>
  );
};

export default NotFoundPage;
