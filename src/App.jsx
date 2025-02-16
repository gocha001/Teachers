import { AuthProvider } from './context/AuthProvider';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Lauout from "./components/Lauout.jsx";
import Loader from "./components/Loader/Loader";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
// import RestrictedRoute from './components/RestrictedRoute.jsx';

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

  return (
    <Suspense fallback={<Loader />}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Lauout />}>
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
    </Suspense>);
}

export default App
