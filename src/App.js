import React from "react";
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import Application from "./router/index";
import Auth from "./router/auth.routes";

import { UseAuth } from "./hooks/auth";

export default function App() {
  const { authenticated } = UseAuth();

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />

      {authenticated ? <Application /> : <Auth />}
    </BrowserRouter>
  );
}
