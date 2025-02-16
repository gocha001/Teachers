import { NavLink } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homeContainer}>
      <div className={css.home}>
        <div className={css.homeContent}>
          <h1 className={css.homeTitle}>
            Unlock your potential with the best{" "}
            <span className={css.span}>language</span> tutors
          </h1>
          <p className={css.homeText}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <NavLink to="teachers" className={css.homeLink}>
            Get started
          </NavLink>
        </div>
        <div className={css.homeImg}>
          <img src="/block.png" />
        </div>
      </div>
      <div className={css.homeFooter}>
        <div className={css.footerCont}>
          <div className={`${css.footerItem} ${css.first}`}>
            <h3 className={css.footerTitle}>32,000 +</h3>
            <p className={css.footerText}>Experienced tutors</p>
          </div>
          <div className={`${css.footerItem} ${css.second}`}>
            <h3 className={css.footerTitle}>300,000 +</h3>
            <p className={css.footerText}>5-star tutor reviews</p>
          </div>
          <div className={`${css.footerItem} ${css.last}`}>
            <h3 className={css.footerTitle}>120 +</h3>
            <p className={css.footerText}>Subjects taught</p>
          </div>
          <div className={`${css.footerItem} ${css.last}`}>
            <h3 className={css.footerTitle}>200 +</h3>
            <p className={css.footerText}>Tutor nationalities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
