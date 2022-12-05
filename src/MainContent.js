import axios from "axios";
import { useEffect, useState } from "react";
import Kysymykset from "./Kysymykset";

const MainContent = (props) => {
  /* const [editMode, setEditMode] = useState(false);
    const handleEditMode = (editMode) => {
        setEditMode(editMode)
    } */

  useEffect(() => {
    const haeTenttiById = async (id) => {
      try {
        const result = await axios.get(`https://localhost:4000/tentit/${id}`);
        console.log("Db:stä haettu yksi tentti", result.data);
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
  }, [props.data.valittuTentti, props.data.tenttiLista]);

  const lisääKysymys = async (event) => {
    console.log("Lisää kysymys.", event.target.value);
    try {
      const uusKysymys = { 
        tentti_id: props.data.valittuTentti,
        nimi: "Uusi kysymys",
        pisteet: "0",
      };
      const result = await axios.post(
        "https://localhost:4000/kysymykset",
        uusKysymys
      );
      console.log("db: kysymyksen lisäys.", result);
      props.dispatch({
        type: "LISÄÄ_KYSYMYS",
        payload: {
          kysymysData: uusKysymys,
          kysymyksen_id: result.data.kysymyksen_id
        },
      });
      console.log("Uuskysymys", uusKysymys);
    } catch (error) {}
  };

  // const kysymyksetIlmanReturnia = props.data.haettuTentti?.kysymykset.map(item => <Kysymykset key={item.id} />);

  // const kysymyksetIlmanReturniaBodylla = props.data.haettuTentti?.kysymykset.map(item => (
  //   <div>
  //     <p>item.id</p>
  //   </div>
  // ));

  const kysymykset = props.data.haettuTentti?.kysymykset?.map((item) => {
    return (
      <Kysymykset
        key={item.id}
        kysymyksen_id={item.id}
        nimi={item.nimi}
        pisteet={item.pisteet}
        dispatch={props.dispatch}
        vastaukset={props.data.haettuTentti?.vastaukset}
      />
    );
  });

  const onkoEditointiNappiNäkyvissä = props.data.valittuTentti ? (
    <button
      className="edit-nappula"
      onClick={() =>
        props.dispatch({
          type: "EDIT_MODE",
          payload: true,
        })
      }
    >
      Muokkaa tentin nimeä
    </button>
  ) : null;

  return (
    <div className="main-container">
      {/* user-modessa näytetään tämä */}
      {!props.data.onkoEditMode ? (
        <div className="tentti-nimi">
          {props.data.haettuTentti?.tentti?.nimi}
          {/* admin-modessa näytetään tämä */}
          {onkoEditointiNappiNäkyvissä}
        </div>
      ) : (
        <div className="tenttinimen-muokkaus">
          <input
            type="text"
            onChange={(event) => {
              props.dispatch({
                type: "TENTIN_NIMI_MUUTTUI",
                payload: {
                  nimi: event.target.value,
                },
              });
            }}
            value={props.data.haettuTentti?.tentti.nimi}
          />
        </div>
      )}
      {kysymykset}
      {props.data.valittuTentti > 0 ? (
        <div className="tallenna-nappula">
          <button
            onClick={() =>
              props.dispatch({
                type: "PÄIVITÄ_TALLENNUSTILA",
                payload: true,
              })
            }
          >
            Tallenna muutokset
          </button>
          <button onClick={lisääKysymys}>Lisää kysymys</button>
        </div>
      ) : (
        <div className="tentti-nimi">Ei tenttejä valittuna.</div>
      )}
    </div>
  );
};

export default MainContent;
