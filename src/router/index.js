import React from "react";
import { BrowserRouter } from "react-router-dom";


import App from "./user.routes";
import Adm from "./admin.routes";

import { UseAuth } from '../hooks/auth';

export default function index() {
  const {admin} = UseAuth();
  return <BrowserRouter> {admin ? <Adm /> : <App />}</BrowserRouter>;
}
