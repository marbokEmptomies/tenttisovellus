import { useState } from "react";
import useDecodedToken from "./Hooks/useDecodedToken"
import {Routes, Route, Navigate} from "react-router-dom"
import App from "./App";
import LoginForm from "./LoginForm";

import "./index.css";

const Login = () => {
  const [token, setToken] = useState(localStorage.getItem("tenttisov_token"));
  const handleTokenChange = (token) => {
    setToken(token);
  };
  const decodedToken = useDecodedToken()
  console.log(decodedToken)
  const validToken = token;

  return (
    <Routes>
      <Route index element={<LoginForm handleTokenChange={handleTokenChange} />} />
      <Route path="home" element={validToken ? <App handleTokenChange={handleTokenChange}/> : <Navigate to="/" />} />
    </Routes>
  )

  /* let component;

  switch (window.location.pathname) {
    case "/":
      component = <LoginForm />;
      break;
    case "/App":
      component = <App />;
      break;
    default:
      console.log("Go away.");
  }

  //tarkistetaan localStoragesta token
  const validToken = token;

  return (
    <div>
      {validToken ? (
        <App handleTokenChange={handleTokenChange}/>
      ) : (
        <LoginForm handleTokenChange={handleTokenChange} />
      )}
    </div>
  ); */
};

export default Login;
