import css from './Logo.module.css';

const Logo = () => {
  return (
    <div className={css.logo}>
      <svg width="28" height="28">
        <use href="/logo.xml#icon-ukraine" />
      </svg>
      <h2 className={css.logoText}>
        LearnLingo
      </h2>
    </div>
  );
}

export default Logo