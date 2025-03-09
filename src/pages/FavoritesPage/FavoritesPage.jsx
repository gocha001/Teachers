import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesIsLoading,
  selectFavoritesError,
  selectFavoritesLastPage,
  selectTeachersFavorites,
} from "../../redux/favorites/selectors";
import css from "./FavoritesPage.module.css";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useEffect, useRef } from "react";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";
import { resetFavorites } from "../../redux/favorites/favoritesSlice";
import Loader from "../../components/Loader/Loader";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectTeachersFavorites);
  const isLoading = useSelector(selectFavoritesIsLoading);
  const error = useSelector(selectFavoritesError);
  const lastPage = useSelector(selectFavoritesLastPage);
  const prevScrollY = useRef(0);

  useEffect(() => {
    dispatch(resetFavorites());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const loadMore = () => {
    prevScrollY.current = window.scrollY + 640;
    dispatch(fetchFavorites());
  };

  useEffect(() => {
    window.scrollTo({
      top: prevScrollY.current,
      behavior: "instant",
    });
  }, [favorites]);

  if (isLoading)
    return (
      <div className={css.loader}>
        <p>Loading...</p>
        <Loader />
      </div>
    );
  if (error) return <div className={css.error}>Error: {error}</div>;

  return (
    <div className={css.favoritesCont}>
      <ul className={css.cards}>
        {Array.isArray(favorites) &&
          favorites.map((favorite, index) => (
            <li key={index}>
              <TeacherCard teacher={favorite} />
            </li>
          ))}
      </ul>
      {!lastPage && (
        <button onClick={loadMore} className={css.btnLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default FavoritesPage;
