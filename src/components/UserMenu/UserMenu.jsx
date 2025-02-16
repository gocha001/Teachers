import LogOut from '../LogOut/LogOut';
import css from './UserMenu.module.css';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className={css.userMenu}>
      <NavLink
        to="favorites"
        className={({ isActive }) => (isActive ? css.active : css.link)}
      >
        Favorites
      </NavLink>
      <LogOut />
    </div>
  );
}

export default UserMenu