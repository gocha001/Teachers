import { AuthProvider } from "./context/AuthProvider";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Loader from "./components/Loader/Loader";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ScrollUp from "./components/ScrollUp/ScrollUp.jsx";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const [scr, setScr] = useState(0);

  window.onscroll = () => {
    if (window.scrollY > 400) {
      setScr(1);
    } else {
      setScr(0);
    }
  };

  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", location.pathname === "/");
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route
              path="favorites"
              element={
                <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      {!!scr && <ScrollUp />}
    </Suspense>
  );
}

export default App;
