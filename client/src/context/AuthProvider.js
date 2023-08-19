import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") || {});
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);
  const [role, setRole] = useState(localStorage.getItem("role") || {});
  useEffect(() => {
    localStorage.setItem("auth", auth);
    localStorage.setItem("isAuth", isAuth);
    localStorage.setItem("role", role);
   }, [auth, isAuth, role]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuth, setIsAuth, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;