import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./index.css";

const LoginForm = (props) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [register, setRegister] = useState({
    nimi: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      if (!login.email || !login.password) {
        throw new Error("Molemmat kentät tarvitaan.");
      }
      const { data } = await axios.post("https://localhost:4000/login", {
        email: login.email,
        password: login.password,
      });

      if (data.käyttäjä.token) {
        localStorage.setItem("tenttisov_token", data.käyttäjä.token);
        props.handleTokenChange(() => data.käyttäjä.token);
      }
    } catch (error) {
      console.log("Login-virhe (kirjautumisessa)", error.response);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (
        !register.email ||
        !register.password ||
        !register.nimi ||
        !register.passwordAgain
      ) {
        throw new Error("Kaikki kentät vaaditaan.");
      } else if (register.password !== register.passwordAgain) {
        throw new Error("Salasanat eivät täsmää.");
      }

      const { data } = await axios.post("https://localhost:4000/kayttajat", {
        email: register.email,
        name: register.nimi,
        password: register.password,
      });
      console.log(data);
      setRegister({ nimi: "", email: "", password: "", passwordAgain: "" });
    } catch (error) {
      console.log("Login-virhe (rekisteröinnissä)", error);
    }
  };

  return (
    <div className="reijo">
        <form onSubmit={handleLogin}>
          <h1>Kirjaudu:</h1>
          <label htmlFor="email">Sähköpostiosoite:</label>
          <input
            required
            onChange={handleLoginChange}
            type="email"
            name="email"
            value={login.email}
          />
          <label htmlFor="password">Salasana:</label>
          <input
            required
            onChange={handleLoginChange}
            type="password"
            name="password"
            value={login.password}
          />
            <button>Kirjaudu</button>
        </form>

      <form onSubmit={handleRegister}>
        <h1>Rekisteröidy</h1>
        <label htmlFor="nimi">Nimi:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="text"
          name="nimi"
          value={register.name}
        />
        <label htmlFor="email">Sähköpostiosoite:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="email"
          name="email"
          value={register.email}
        />
        <label htmlFor="password">Salasana:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="password"
          name="password"
          value={register.password}
        />
        <label htmlFor="password">Salasana uudelleen:</label>
        <input
          required
          onChange={handleRegisterChange}
          type="password"
          name="passwordAgain"
          value={register.passwordAgain}
        />
        <button>Rekisteröidy</button>
      </form>
      {/* <Routes>
        <Route path="/app" element={<App />}>
        </Route>
    </Routes> */}
    </div>
  );
};

export default LoginForm;
