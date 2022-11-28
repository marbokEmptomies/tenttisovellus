import "./App.css";
import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

const reducer = (state, action) => {
  switch (action.type) {
    case "ALUSTA_DATA": {
      console.log("Alusta data: ", action.payload);
      return { tenttiLista: action.payload };
    }

    case "VALITSE_TENTTI": {
      console.log("Valitse tentti tapahtui.", action.payload);
      return { ...state, valittuTentti: action.payload }; //valittuTentti = tentin id.
    }

    case "HAE_TENTTI": {
        console.log("Haetaan tentti", action.payload)
        return {...state, haettuTentti: action.payload}
    }

    default:
      throw new Error("Reducer error...");
  }
};

const App = (props) => {
  const [tentitLista, dispatch] = useReducer(reducer, {tenttiLista: [], valittuTentti:""});
  console.log(tentitLista);

  useEffect(() => {
    const haeDataa = async () => {
      try {
        const result = await axios.get("https://localhost:4000/tentit");
        console.log(result.data);
        dispatch({
          type: "ALUSTA_DATA",
          payload: result.data,
        });
      } catch (error) {
        console.log("virhetilanne", error);
      }
    };
    haeDataa();
  }, []);

  return (
    <>
      <NavBar
        handleTokenChange={props.handleTokenChange}
        listaTentteja={tentitLista.tenttiLista}
        dispatch={dispatch}
      />
      <MainContent data={tentitLista} dispatch={dispatch}/>
    </>
  );
};

export default App;
