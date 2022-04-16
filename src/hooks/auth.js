import React, { createContext, useState, useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


import api, { TOKEN_KEY, ADMIN, ID, CITY } from "../api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(() => {
    const isLogged = sessionStorage.getItem(TOKEN_KEY);
    return !!isLogged;
  });

  const [admin, setAdmin] = useState(() => {
    const isAdmin = sessionStorage.getItem(ADMIN);
    return !!isAdmin;
  });

  function time() {
    const timer = setTimeout(() => {
      document.location.reload();
    }, 100);
    return () => clearTimeout(timer);
  }

  const login = (email, senha) => {
    api
      .post("/login", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        sessionStorage.setItem(TOKEN_KEY, response.data.token);
        setAuthenticated(true);

        localStorage.setItem(ID, response.data.id_user);
        localStorage.setItem(CITY, response.data.city);

        if (response.data.admin === 1) {
          setAdmin(true);
          sessionStorage.setItem(ADMIN, true);
        }

         time();
        toast.success("Bem vindo de volta!")
      })
      .catch(function (error) {
        toast.error("Email ou Senha Incorretos");
      });
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setAuthenticated(false);
    sessionStorage.removeItem(ADMIN);
    setAdmin(false);
    sessionStorage.removeItem(ID);
  };

  return (
    <AuthContext.Provider value={{ authenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
function UseAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, UseAuth };
