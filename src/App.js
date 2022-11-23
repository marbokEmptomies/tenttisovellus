import "./App.css";
import { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const App = () => {
  return (
    <div className="princessdiana">
      <h1>Tenttisovellus (kirjauduttu)</h1>
      <button>Kirjaudu ulos</button>
    </div>
  );
};

export default App;
