import "./App.css";
import Vastaukset from "./Vastaukset";

const Kysymykset = (props) => {
  //item => {id: 11, kysymys_id: 26, nimi: 'En osaa sanoa'}

  // Jos vastauksen kysymys_id on sama kuin kysymyys komponentin id, sisällytä vastaus alla olevaan listaan
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
        //Tee jokaisesti itemsti esim. vastauskomponentti?
        <div className="vvnimi">
            <input type="radio" name={item.kysymys_id} value={item.id}/>
            <span>{item.nimi}</span>
            {/* <input type="checkbox" checked={item.onkooikein} /> Onko oikein? */} {/* tämä admin-puolelle */}
        </div>
    )
  })
  
  console.log("vastaukset: ", vastausvaihtoehdot)
  return (
    <>
      <div className="kysymys-container">
        <h4>{props.nimi}</h4><small>Kysymyksen pistemäärä: {props.pisteet}</small>
        {vastausvaihtoehdot.length > 0 ? vastausvaihtoehdot : null}
      </div>
    </>
  );
};

export default Kysymykset;
