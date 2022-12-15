import "./App.css";
import { useReducer, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import MainContent from "./MainContent";

const appData = {
  tenttiLista: [],
  haettuTentti: {},
  valittuTentti: "",
  kysymykset: [],
  tallennetaanko: false,
  onkoEditMode: false,
  onkoKysymysEdit: false,
  onkoVastausEdit: false,
  onkoadmin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ALUSTA_DATA": {
      console.log("Alusta data: ", action.payload);
      return {
        tenttiLista: action.payload,
        onkoKysymysEdit: state.onkoKysymysEdit,
        onkoVastausEdit: state.onkoVastausEdit,
      };
    }

    case "TALLENNA_TENTIN_NIMI": {
      console.log("Tentin nimen tallennus tapahtui:", action);
      const uusiTenttiLista = state.tenttiLista.map((item) => {
        if (item.id === action.payload.tentin_id) {
          return {
            ...item,
            nimi: action.payload.uusiNimi,
            päivämäärä: action.payload.uusiPvm,
            onkovoimassa: action.payload.uusiVoimassa,
          };
        } else {
          return item;
        }
      });
      return { ...state, tenttiLista: uusiTenttiLista, onkoEditMode: false };
    }

    case "VALITSE_TENTTI": {
      console.log(
        "Valitse tentti tapahtui. Valitun tentin id: ",
        action.payload
      );
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
          {
            nimi: action.payload.tenttiData.nimi,
            id: action.payload.uudenTentinId,
            onkovoimassa: action.payload.tenttiData.onkovoimassa,
            päivämäärä: action.payload.tenttiData.päivämäärä,
          },
        ],
      };
    }

    case "TENTIN_NIMI_MUUTTUI": {
      console.log("Tentin nimeä muutettu.", action);
      const stateKopio = { ...state };
      stateKopio.haettuTentti.tentti.nimi = action.payload.nimi;
      return stateKopio;
    }

    case "TENTIN_PÄIVÄMÄÄRÄ_MUUTTUI": {
      console.log("Tentin päivämäärää muutettiin. ", action);
      const stateKopio = { ...state };
      stateKopio.haettuTentti.tentti.päivämäärä = action.payload;
      return stateKopio;
    }

    case "TENTIN_VOIMASSAOLO_MUUTTUI": {
      console.log("Tentin voimassaolo muuttui. ", action);
      const stateKopio = { ...state };
      stateKopio.haettuTentti.tentti.onkovoimassa = action.payload;
      return stateKopio;
    }

    case "POISTA_TENTTI": {
      console.log("Poista tentti muuttui", action);
      const uudetTentit = state.tenttiLista.filter(
        (item) => action.payload !== item.id
      );
      return {
        ...state,
        tenttiLista: uudetTentit,
        valittuTentti: "",
        haettuTentti: {},
      };
    }

    case "LISÄÄ_KYSYMYS": {
      console.log("Lisää kysymys muuttui", action);
      return {
        ...state,
        haettuTentti: {
          ...state.haettuTentti,
          kysymykset: [
            ...state.haettuTentti.kysymykset,
            {
              id: action.payload.kysymyksen_id,
              nimi: action.payload.kysymysData.nimi,
              pisteet: action.payload.kysymysData.pisteet,
            },
          ],
        },
      };
    }

    case "POISTA_KYSYMYS": {
      console.log("Poista kysymys muuttui", action);
      const uudetKysymykset = state.haettuTentti.kysymykset.filter(
        (item) => action.payload.kysymys_id !== item.id
      );
      return {
        ...state,
        haettuTentti: { ...state.haettuTentti, kysymykset: uudetKysymykset },
      };
    }

    case "LISÄÄ_VASTAUS": {
      console.log("Vastausvaihtoehdon lisääminen muuttui", action);
      return {
        ...state,
        haettuTentti: {
          ...state.haettuTentti,
          vastaukset: [
            ...state.haettuTentti.vastaukset,
            {
              kysymys_id: `${action.payload.vastausData.kysymys_id}`,
              nimi: `${action.payload.vastausData.nimi}`,
              onkooikein: action.payload.vastausData.onkooikein,
              id: action.payload.vastauksen_id,
            },
          ],
        },
      };
    }

    case "KYSYMYKSEN_NIMI_MUUTTUI": {
      console.log("Kysymyksen nimeä muutettu.", action);
      const stateKopio = { ...state };
      stateKopio.haettuTentti.kysymykset[action.payload.kys_index].nimi =
        action.payload.nimi;
      return stateKopio;
    }

    case "KYSYMYKSEN_PISTEET_MUUTTUI": {
      console.log("Kysymyksen pistemäärää muutettu.", action);
      const stateKopio = { ...state };
      stateKopio.haettuTentti.kysymykset[action.payload.kys_index].pisteet =
        action.payload.value;
      return stateKopio;
    }

    case "TALLENNA_KYSYMYS": {
      console.log("Kysymyksen tallennus tapahtui:", action);
      const uusiTenttiLista = state.haettuTentti.kysymykset.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            nimi: action.payload.uusiNimi,
            pisteet: action.payload.uusiPisteet,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        uusiTenttiLista,
        onkoKysymysEdit: false,
      };
    }

    case "POISTA_VASTAUS": {
      console.log("Poista vastaus muuttui", action);
      const uudetVastaukset = state.haettuTentti.vastaukset.filter(
        (item) => action.payload.vastauksen_id !== item.id
      );
      return {
        ...state,
        haettuTentti: { ...state.haettuTentti, vastaukset: uudetVastaukset },
      };
    }

    case "VASTAUKSEN_NIMI_MUUTTUI": {
      console.log("Vastauksen nimeä muutettu.", action);
      const stateKopio = { ...state };
      const uudetVastaukset = stateKopio.haettuTentti.vastaukset.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, nimi: action.payload.nimi };
        } else return item;
      });
      return {
        ...stateKopio,
        haettuTentti: {
          ...stateKopio.haettuTentti,
          vastaukset: uudetVastaukset,
        },
      };
    }

    case "OIKEA_VASTAUS_MUUTTUI": {
      console.log("Oikea vastaus (dispatch)", action)
      const stateKopio = { ...state };
      const uudetVastaukset = stateKopio.haettuTentti.vastaukset.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, onkooikein: action.payload };
        } else return item;
      });
      return {
        ...stateKopio,
        haettuTentti: {
          ...stateKopio.haettuTentti,
          vastaukset: uudetVastaukset,
        },
      };
    }

    case "TALLENNA_VASTAUS": {
      console.log("Vastauksen tallennus tapahtui (dispatch):", action);
      const uusiTenttiLista = state.haettuTentti.vastaukset.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            nimi: action.payload.uusiNimi,
            kysymys_id: action.payload.uusiKysymys_id,
            onkooikein: action.payload.uusiOikein,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        uusiTenttiLista,
        onkoVastausEdit: false,
      };
    }

    case "EDIT_MODE": {
      console.log("Edit mode napsuttunut", action);
      return { ...state, onkoEditMode: action.payload };
    }

    case "KYSYMYS_EDIT_MODE": {
      console.log("Kysymys-edit mode muuttui", action);
      return { ...state, onkoKysymysEdit: action.payload };
    }

    case "VASTAUS_EDIT_MODE": {
      console.log("Vastaus-edit mode muuttui", action);
      return { ...state, onkoVastausEdit: action.payload };
    }

    default:
      throw new Error("Reducer error...");
  }
};

const App = (props) => {
  const [tentitLista, dispatch] = useReducer(reducer, appData);
  console.log("Merkki:", tentitLista);

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
        valittuTentti={tentitLista.valittuTentti}
        dispatch={dispatch}
      />
      <MainContent data={tentitLista} dispatch={dispatch} />
    </>
  );
};

export default App;
