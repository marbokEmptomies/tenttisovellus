import "./App.css";
import axios from "axios";
import trashcan from "./trash-can-icon.png";
import edit from "./edit-icon.png";
import Vastaukset from "./Vastaukset"

const Kysymykset = (props) => {
  //item => {id: 11, kysymys_id: 26, nimi: 'En osaa sanoa'}

  // Jos vastauksen kysymys_id on sama kuin kysymyskomponentin id, sisällytä vastaus alla olevaan listaan
  const filtervastaukset = props.vastaukset.filter((item) => {
    if (props.kysymyksen_id === item.kysymys_id) {
      return item;
    }
  });
  console.log("filter ", filtervastaukset)
  //   const vastausvaihtoehdot = filtervastaukset.map(item => {
  //     return (
  //         //Tee jokaisesti itemsti esim. vastauskomponentti?
  //         <p>{item.nimi}</p>
  //     )
  //   })
  const poistaKysymys = async (kys_id) => {
    try {
      await axios.delete(`https:localhost:4000/kysymykset/${kys_id}`);
      console.log("Juu kysymykselle: ", kys_id);
      props.dispatch({
        type: "POISTA_KYSYMYS",
        payload: {
          kysymys_id: kys_id,
        },
      });
      console.log("Kysymys poistettu.");
    } catch (error) {
      console.log("Kysymyksen poistaminen epäonnistui.");
    }
  };
  const lisääVastausVaihtoehto = async () => {
    try {
      const uusiVastaus = {
        kysymys_id: props.kysymyksen_id,
        nimi: "Uusi vastaus.",
        onkooikein: false,
      };
      const result = await axios.post(
        `https:localhost:4000/vastausvaihtoehdot`,
        uusiVastaus
      );
      console.log(
        `db: vastauksen lisäys. Vastauksen id: ${result.data.vastauksen_id}`
      );
      props.dispatch({
        type: "LISÄÄ_VASTAUS",
        payload: {
          vastausData: uusiVastaus,
          vastauksen_id: result.data.vastauksen_id,
        },
      });
    } catch (error) {
      console.log("Vvaihtoehto, virhetilanne.");
    }
  };

  const vastausvaihtoehdot = filtervastaukset.map((item) => {
    return (
        <Vastaukset
        key = {item.id}
        vastauksen_id = {item.id}
        kysymyksen_id = {item.kysymys_id}
        vastauksen_nimi = {item.nimi}
        onkooikein = {item.onkooikein}
        dispatch = {props.dispatch} />
    );
  });
console.log("vastausvaihtoehdot: ", vastausvaihtoehdot)
  return (
    <>
      <div className="kysymys-container">
        <div className="kysymykset">
          <h4>
            {props.nimi}
            <button
              className="trash"
              onClick={() => poistaKysymys(props.kysymyksen_id)}
            >
              <img src={trashcan} />
            </button>
            <button
              className="trash"
            >
              <img src={edit} />
            </button>
          </h4>
          {/* <button className="trash" onClick={() => poistaKysymys(props.kysymyksen_id)}><img src={trashcan} /></button> */}
          <span>
            {vastausvaihtoehdot.length > 0 ? vastausvaihtoehdot : null}
          </span>
        </div>
      </div>
      <span className="vastaus-nappula">
        <button onClick={lisääVastausVaihtoehto}>Lisää vastaus</button>
      </span>
    </>
  );
};

export default Kysymykset;
