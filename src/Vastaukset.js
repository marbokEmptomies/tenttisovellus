import './App.css'
import axios from "axios"

const Vastaukset = (props) => {

    const poistaVastausVaihtoehto = async (vastaus_id) => {
        try {
          await axios.delete(
            `https:localhost:4000/vastausvaihtoehdot/${vastaus_id}`
          );
          console.log(
            `db: vastauksen poisto. Vastauksen id: ${vastaus_id}`
          );
          props.dispatch({
            type: "POISTA_VASTAUS",
            payload: {
              vastauksen_id: vastaus_id,
            },
          });
        } catch (error) {
          console.log("Vvaihtoehdon poisto, virhetilanne.");
        }
      };

    return (
        <div>
        <input type="radio" name={props.kysymyksen_id} value={props.vastauksen_id} />
        <span className="vv">
          {props.vastauksen_nimi} <small>{props.vastauksen_id}</small>
          <button onClick={() => poistaVastausVaihtoehto(props.vastauksen_id)}>Poista vastaus</button>
        </span>
        <span className="oikeavastaus">
          <input type="checkbox" defaultChecked={props.onkooikein} /> Oikein.
        </span>{" "}
      </div>
    )
}

export default Vastaukset