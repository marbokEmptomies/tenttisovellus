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

  // const kysymyksetIlmanReturnia = props.data.haettuTentti?.kysymykset.map(item => <Kysymykset key={item.id} />);

  // const kysymyksetIlmanReturniaBodylla = props.data.haettuTentti?.kysymykset.map(item => (
  //   <div>
  //     <p>item.id</p>
  //   </div>
  // ));

  const kysymykset = props.data.haettuTentti?.kysymykset.map((item) => {
    return (
      <Kysymykset
        key={item.id}
        kysymyksen_id={item.id}
        nimi={item.nimi}
        pisteet={item.pisteet}
        vastaukset={props.data.haettuTentti?.vastaukset}
      />
    );
  });

  return (
    <div className="main-container">
      <div className="tentti-nimi">{props.data.haettuTentti?.tentti.nimi}</div>
      {kysymykset}
      {/* <h3><Kysymykset kysymykset={kysymykset} vastaukset={props.data.haettuTentti?.vastaukset}/></h3> */}
    </div>
  );
};

export default MainContent;
