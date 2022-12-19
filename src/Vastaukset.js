import "./App.css";
import axios from "axios";
import useDecodedToken from "./Hooks/useDecodedToken";

const Vastaukset = (props) => {
  const {onkoadmin} = useDecodedToken()
  console.log("vastaukset-komponentti heräsi.");
  const poistaVastausVaihtoehto = async (vastaus_id) => {
    try {
      await axios.delete(
        `https:localhost:4000/vastausvaihtoehdot/${vastaus_id}`
      );
      console.log(`db: vastauksen poisto. Vastauksen id: ${vastaus_id}`);
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
  const tallennaVastaukset = async (id) => {
    console.log("Vastauksen nimi tallennettu.");
    console.log(
      "VastausData: ",
      props.kysymyksen_id,
      props.nimi,
      props.onkooikein
    );
    try {
      const uusiVastausData = {
        uusiKysymys_id: props.kysymyksen_id,
        uusiNimi: props.nimi,
        uusiOikein: props.onkooikein,
      };
      const result = await axios.put(
        `https://localhost:4000/vastausvaihtoehdot/${id}`,
        uusiVastausData
      );
      console.log("Vastaukset tallennettu db:hen", result.data);
      props.dispatch({
        type: "TALLENNA_VASTAUS",
        payload: {
          uusiNimi: uusiVastausData.uusiNimi,
          uusiOikein: uusiVastausData.uusiOikein,
          uusiKysymys_id: uusiVastausData.uusiKysymys_id,
          vastauksen_id: id,
        },
      });
    } catch (error) {
      console.log("Vastausten tallennus epäonnistui.");
    }
  };

  const vastausEditNappula = props.vastauksen_id ? (
    <button
      className="edit-nappula"
      onClick={() =>
        props.dispatch({
          type: "VASTAUS_EDIT_MODE",
          payload: true,
        })
      }
    >
      Muokkaa vastauksia
    </button>
  ) : null;

  if(!onkoadmin) {
    return (
      <div>
            <input
              type="radio"
              name={props.kysymyksen_id}
              value={props.vastauksen_id}
            />
            <span className="vv">
              {props.nimi} {props.vastauksen_id}
            </span>
      </div>
    );
  }

  return (
    <div>
      {!props.onkoVastausEdit ? (
        <>
          <input
            type="radio"
            name={props.kysymyksen_id}
            value={props.vastauksen_id}
          />
          <span className="vv">
            {props.nimi} {props.vastauksen_id}
            <button
              className="edit-nappula"
              onClick={() => poistaVastausVaihtoehto(props.vastauksen_id)}
            >
              Poista vastaus
            </button>
            {vastausEditNappula}
          </span>
        </>
      ) : (
        <>
          <span>
            <input
              type="text"
              onChange={(event) => {
                props.dispatch({
                  type: "VASTAUKSEN_NIMI_MUUTTUI",
                  payload: {
                    nimi: event.target.value,
                    id: props.vastauksen_id,
                  },
                });
              }}
              defaultValue={props.nimi}
            />
          </span>
          <span className="oikeavastaus">
            <input
              type="checkbox"
              defaultChecked={props.onkooikein}
              onChange={(event) => {
                props.dispatch({
                  type: "OIKEA_VASTAUS_MUUTTUI",
                  payload: {
                    uusiOikein: event.target.checked,
                    id: props.vastauksen_id,
                  },
                });
              }}
            />{" "}
            Oikea vastaus?
          </span>{" "}
          <button onClick={() => tallennaVastaukset(props.vastauksen_id)}>
            Tallenna vastaukset
          </button>
        </>
      )}
    </div>
  );
};

export default Vastaukset;
