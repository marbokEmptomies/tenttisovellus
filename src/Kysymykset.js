import "./App.css";
import axios from "axios"
import trashcan from "./trash-can-icon.png"

const Kysymykset = (props) => {
  //item => {id: 11, kysymys_id: 26, nimi: 'En osaa sanoa'}

  // Jos vastauksen kysymys_id on sama kuin kysymyskomponentin id, sisällytä vastaus alla olevaan listaan
  const filtervastaukset = props.vastaukset.filter((item) => {
    if (props.kysymyksen_id === item.kysymys_id) {
      return item;
    }
  });

//   const vastausvaihtoehdot = filtervastaukset.map(item => {
//     return (
//         //Tee jokaisesti itemsti esim. vastauskomponentti?
//         <p>{item.nimi}</p>
//     )
//   })
const poistaKysymys = async(kys_id) => {
    try {
        await axios.delete(`https:localhost:4000/kysymykset/${kys_id}`)
        console.log("Juu kysymykselle: ", kys_id)
        props.dispatch({
            type: "POISTA_KYSYMYS",
            payload: {
                kysymys_id: kys_id
            }
          });
        console.log("Kysymys poistettu.")
    } catch (error) {
        console.log("Kysymyksen poistaminen epäonnistui.")
    }
  };

  const lisääVastausVaihtoehto = async() => {
    try {
        const uusiVastaus = {
            kysymys_id: props.kysymyksen_id,
            nimi: "Uusi vastaus.",
            onkooikein: false
        }
        const result = await axios.post(`https:localhost:4000/vastausvaihtoehdot`, uusiVastaus)
        console.log(`db: vastauksen lisäys. Vastauksen id: ${result.data.vastauksen_id}`);
        props.dispatch({
        type: "LISÄÄ_VASTAUS",
        payload: {
          vastausData: uusiVastaus,
          vastauksen_id: result.data.vastauksen_id
        },
      });
    } catch (error) {
        console.log("Vvaihtoehto, virhetilanne.")
        
    }
  }

  const vastausvaihtoehdot = filtervastaukset.map(item => {
    return (
        //Tee jokaisestaitemista esim. vastauskomponentti?
        <div>
            <input type="radio" name={item.kysymys_id} value={item.id}/>
            <span className="vv">{item.nimi} <small>{item.id}</small></span>
            <span className="oikeavastaus"><input type="checkbox" defaultChecked={item.onkooikein} /> Oikein.</span>  {/* admin-puolelle */}
        </div>
    )
  })
  
  console.log("vastaukset: ", vastausvaihtoehdot)
  return (
    <div className="kysymys-container">
        <div className="kysymykset">
        <h4>{props.nimi} {props.kysymyksen_id}<button className="trash" onClick={() => poistaKysymys(props.kysymyksen_id)}><img src={trashcan} /></button></h4>
        {/* <button className="trash" onClick={() => poistaKysymys(props.kysymyksen_id)}><img src={trashcan} /></button> */}
        <button onClick={lisääVastausVaihtoehto}>Lisää vastaus</button>
        <span>{vastausvaihtoehdot.length > 0 ? vastausvaihtoehdot : null}</span>
        </div>
    </div>
  );
};

export default Kysymykset;
