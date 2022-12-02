import "./App.css";
import { useReducer, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

const appData = {
  tenttiLista: [],
  valittuTentti: "",
  tallennetaanko: "false",
  onkoadmin: "false",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ALUSTA_DATA": {
      console.log("Alusta data: ", action.payload);
      return { tenttiLista: action.payload };
    }

    case "PÄIVITÄ_TALLENNUSTILA": {
      console.log("Tallennus tapahtui:", action.payload);
      return { ...state, tallennetaanko: action.payload };
    }

    case "VALITSE_TENTTI": {
      console.log("Valitse tentti tapahtui. Valitun tentin id: ", action.payload);
      return { ...state, valittuTentti: action.payload }; //valittuTentti = tentin id.
    }

    case "HAE_TENTTI": {
      console.log("Haetaan tentti", action.payload);
      return { ...state, haettuTentti: action.payload };
    }

    case "LISÄÄ_TENTTI": {
      console.log("Lisää tentti muuttui", action);
      return {
        ...state,
        tenttiLista: [
          ...state.tenttiLista,
          { nimi: action.payload.tenttiData.nimi,
            id: action.payload.uudenTentinId,
            onkovoimassa: action.payload.tenttiData.onkovoimassa,
            päivämäärä: action.payload.tenttiData.päivämäärä },
        ],
      };
    }

    case "POISTA_TENTTI": {
      console.log("Poista tentti muuttui", action);
      const uudetTentit = state.tenttiLista.filter(
        (item) => action.payload !== item.id
      );
      return { ...state, tenttiLista: uudetTentit };
    }

    default:
      throw new Error("Reducer error...");
  }
};

const App = (props) => {
  const [tentitLista, dispatch] = useReducer(reducer, appData);
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

  useEffect(() => {
    const vieDataa = async () => {
      try {
        await axios.post("https://localhost:4000/tentit", tentitLista); // mitä tallennetaan?
        dispatch({
          type: "PÄIVITÄ_TALLENNUSTILA",
          payload: false,
        });
      } catch (error) {
        console.log("virhetilanne", error);
      }
    };
    if (tentitLista.tallennetaanko === true) {
      vieDataa();
    }
  }, [tentitLista.tallennetaanko]);

  return (
    <>
      <NavBar
        handleTokenChange={props.handleTokenChange}
        listaTentteja={tentitLista.tenttiLista}
        valittuTentti={tentitLista.valittuTentti}
        dispatch={dispatch}
      />
      <MainContent data={tentitLista} dispatch={dispatch} />
    </>
  );
};

export default App;
