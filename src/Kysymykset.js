import "./App.css";
import axios from "axios";
import Vastaukset from "./Vastaukset";

const Kysymykset = (props) => {

  // Jos vastauksen kysymys_id on sama kuin kysymyskomponentin id, sisällytä vastaus alla olevaan listaan
  const filtervastaukset = props.vastaukset.filter((item) => {
    if (props.kysymyksen_id === item.kysymys_id) {
      return item;
    }
  });

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

  const tallennaKysymys = async (id) => {
    console.log("Kysymyksen nimi tallennettu.");
    try {
      const uusiKysymysData = {
        uusiNimi: props.nimi,
        uusiPisteet: props.pisteet,
      };
      const result = await axios.put(
        `https://localhost:4000/kysymykset/${id}`,
        uusiKysymysData
      );
      console.log("Kysymys tallennettu db:hen", result.data);
      props.dispatch({
        type: "TALLENNA_KYSYMYS",
        payload: {
          uusiNimi: uusiKysymysData.uusiNimi,
          uusiPisteet: uusiKysymysData.uusiPisteet,
          kysymyksen_id: id,
        },
      });
    } catch (error) {
      console.log("Kysymyksen tallennus epäonnistui.");
    }
  };

  const vastausvaihtoehdot = filtervastaukset.map((item, index) => {
    return (
      <Vastaukset
        key={item.id}
        vastaus_index={index}
        vastauksen_id={item.id}
        kysymyksen_id={item.kysymys_id}
        nimi={item.nimi}
        onkooikein={item.onkooikein}
        onkoVastausEdit={props.onkoVastausEdit}
        dispatch={props.dispatch}
      />
    );
  });
  const kysymysEditNappula = props.kysymyksen_id ? (
    <button
      className="edit-nappula"
      onClick={() =>
        props.dispatch({
          type: "KYSYMYS_EDIT_MODE",
          payload: true,
        })
      }
    >
      Muokkaa kysymystä
    </button>
  ) : null;

  return (
    <>
      <div className="kysymys-container">
        <div className="kysymykset">
          <h4>
            {!props.onkoKysymysEdit ? (
              <>
              {props.nimi} {props.kysymyksen_id}
              <p>Pistemäärä: {props.pisteet}</p>
                <button
                  className="edit-nappula"
                  onClick={() => poistaKysymys(props.kysymyksen_id)}
                >
                  Poista kysymys
                </button>
                {kysymysEditNappula}
              </>
            ) : (
              <><input
                  type="text"
                  onChange={(event) => {
                    props.dispatch({
                      type: "KYSYMYKSEN_NIMI_MUUTTUI",
                      payload: {
                        nimi: event.target.value,
                        kys_index: props.kys_index,
                      },
                    });
                  }}
                  value={props.nimi}
                />
                <input
                  type="text"
                  onChange={(event) => {
                    props.dispatch({
                      type: "KYSYMYKSEN_PISTEET_MUUTTUI",
                      payload: {
                        value: event.target.value,
                        kys_index: props.kys_index,
                      },
                    });
                  }}
                  value={props.pisteet}
                />
              <button onClick={() => tallennaKysymys(props.kysymyksen_id)}>
                Tallenna kysymys
              </button></>
            )}
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
