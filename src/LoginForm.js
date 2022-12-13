import { useState } from "react";
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
        localStorage.setItem("tenttisov_käyttäjä", data.käyttäjä.name);
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
    <div className="form-container">
        <form onSubmit={handleLogin}>
          <h1>Kirjaudu:</h1>
          <label htmlFor="email">Sähköpostiosoite:</label>
          <input
            required
            onChange={handleLoginChange}
            id="login_email"
            type="email"
            name="email"
            value={login.email}
            placeholder="Anna sähköpostiosoite."
          />
          <label htmlFor="password">Salasana:</label>
          <input
            required
            onChange={handleLoginChange}
            id="login_pw"
            type="password"
            name="password"
            value={login.password}
            placeholder="Anna salasana."
          />
            <button id="login_btn">Kirjaudu</button>
        </form>

      <form onSubmit={handleRegister}>
        <h1>Rekisteröidy:</h1>
        <label htmlFor="nimi">Nimi:</label>
        <input
          required
          onChange={handleRegisterChange}
          id="reg_name"
          type="text"
          name="nimi"
          value={register.name}
          placeholder="Anna nimesi."
        />
        <label htmlFor="email">Sähköpostiosoite:</label>
        <input
          required
          onChange={handleRegisterChange}
          id="reg_email"
          type="email"
          name="email"
          value={register.email}
          placeholder="Anna sähköpostiosoitteesi."
        />
        <label htmlFor="password">Salasana:</label>
        <input
          required
          onChange={handleRegisterChange}
          id="reg_pw"
          type="password"
          name="password"
          value={register.password}
          placeholder="Anna salasana."
        />
        <label htmlFor="password">Salasana uudelleen:</label>
        <input
          required
          onChange={handleRegisterChange}
          id="reg_pw_again"
          type="password"
          name="passwordAgain"
          value={register.passwordAgain}
          placeholder="Anna salasana uudelleen."
        />
        <button>Rekisteröidy</button>
      </form>
    </div>
  );
};

export default LoginForm;
