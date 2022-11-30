import axios from "axios";
import { useEffect } from "react";
import Kysymykset from "./Kysymykset";

const MainContent = (props) => {
  useEffect(() => {
    const haeTenttiById = async (id) => {
      try {
        const result = await axios.get(`https://localhost:4000/tentit/${id}`);
        console.log("MainContent get", result.data);
        props.dispatch({
          type: "HAE_TENTTI",
          payload: result.data,
        });
      } catch (error) {
        console.log("Virhe tentin haussa.", error);
      }
    };
    if (props.data.valittuTentti) {
      haeTenttiById(props.data.valittuTentti);
    }
  }, [props.data.valittuTentti]);

  const kysymykset = props.data.haettuTentti?.kysymykset;

  const vastaukset = props.data.haettuTentti?.vastaukset;

  /* const vastaukset = props.data.haettuTentti?.vastaukset.map(
    (item) => item.nimi
  ); */

  return (
    <div className="main-container">
      <h1>{props.data.haettuTentti?.tentti.nimi}</h1>
      <Kysymykset kysymykset={kysymykset} vastaukset={vastaukset} />
    </div>
  );
};

export default MainContent;
