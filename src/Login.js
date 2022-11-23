import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import App from "./App";
import LoginForm from "./LoginForm";

import "./index.css";

const Login = () => {
    const [token, setToken ] = useState(localStorage.getItem('tenttisov_token'))
    const handleTokenChange = (token) => {
      setToken(token)
    }

  let component;

  switch (window.location.pathname) {
    case "/":
      component = <LoginForm />;
      break;
    case "/App":
      component = <App />;
      break;
  }

  //tarkistetaan localStoragesta token
  const validToken = token

  return <div className="keijo">{validToken ? <App /> : <LoginForm handleTokenChange={handleTokenChange}/>}</div>;
};

export default Login;
