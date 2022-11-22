import "./App.css";
import { useReducer, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const App = () => {
  return (
    <div>
      <h1>Tenttisovellus (kirjauduttu)</h1>
      <Outlet />
    </div>
  );
};

export default App;
