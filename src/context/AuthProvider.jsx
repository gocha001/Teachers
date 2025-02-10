import { useEffect, useState } from "react";
import { getCurrentUser } from "../redux/user/userOperations.js";
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getCurrentUser(setUser);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
