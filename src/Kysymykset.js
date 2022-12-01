import "./App.css";
import Vastaukset from "./Vastaukset";

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

  const vastausvaihtoehdot = filtervastaukset.map(item => {
    return (
        //Tee jokaisestaitemista esim. vastauskomponentti?
        <div>
            <input type="radio" name={item.kysymys_id} value={item.id}/>
            <span className="vv">{item.nimi}</span>
            <span className="oikeavastaus"><input type="checkbox" checked={item.onkooikein} /> Oikein.</span>  {/* admin-puolelle */}
        </div>
    )
  })
  
  console.log("vastaukset: ", vastausvaihtoehdot)
  return (
    <div className="kysymys-container">
        <div className="kysymykset">
        <h4>{props.nimi}</h4>
        <span>{vastausvaihtoehdot.length > 0 ? vastausvaihtoehdot : null}</span>
        </div>
    </div>
  );
};

export default Kysymykset;
