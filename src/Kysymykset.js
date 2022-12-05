import "./App.css";
import axios from "axios"

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
        console.log("Vituiksmän.")
    }
  };

  const vastausvaihtoehdot = filtervastaukset.map(item => {
    return (
        //Tee jokaisestaitemista esim. vastauskomponentti?
        <div>
            <input type="radio" name={item.kysymys_id} value={item.id}/>
            <span className="vv">{item.nimi}</span>
            <span className="oikeavastaus"><input type="checkbox" defaultChecked={item.onkooikein} /> Oikein.</span>  {/* admin-puolelle */}
        </div>
    )
  })
  
  console.log("vastaukset: ", vastausvaihtoehdot)
  return (
    <div className="kysymys-container">
        <div className="kysymykset">
        <h4>{props.nimi} {props.kysymyksen_id}</h4>
        <button onClick={() => poistaKysymys(props.kysymyksen_id)}>Poista kysymys</button>
        <span>{vastausvaihtoehdot.length > 0 ? vastausvaihtoehdot : null}</span>
        </div>
    </div>
  );
};

export default Kysymykset;
