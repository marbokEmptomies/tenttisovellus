import "./App.css";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

const App = () => {
  return (
    <>
        <NavBar /> 
        <MainContent />   
    </>
  );
};

export default App;
