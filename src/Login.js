import { useState } from "react";
import App from "./App";
import LoginForm from "./LoginForm";

import "./index.css";

const Login = () => {
  const [token, setToken] = useState(localStorage.getItem("tenttisov_token"));
  const handleTokenChange = (token) => {
    setToken(token);
  };

  let component;

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
  );
};

export default Login;
