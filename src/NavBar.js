import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

const NavBar = (props) => {
  const signOut = () => {
    localStorage.removeItem("tenttisov_token");
    props.handleTokenChange(null)
  };

  return (
    <>
      <div>
        <nav className="nav">
          <ul>
            <li>Tentit</li>
            <li>Tietoa sovelluksesta</li>
            <li>
              <button onClick={signOut}>Poistu</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
