import './App.css';
import { useReducer, useEffect } from 'react'
import axios from 'axios'
import Tentti from './Tentti'

let t1_vastaus1_1 = {nimi: "Tentti1, Kysymys1, Vastaus1", onkoOikein: false}
let t1_vastaus1_2 = {nimi: "Tentti1, Kysymys1, Vastaus2", onkoOikein: false}
let t1_vastaus1_3 = {nimi: "Tentti1, Kysymys1, Vastaus3", onkoOikein: false}

let t1_vastaus2_1 = {nimi: "Tentti1, Kysymys2, Vastaus1", onkoOikein: false}
let t1_vastaus2_2 = {nimi: "Tentti1, Kysymys2, Vastaus2", onkoOikein: false}
let t1_vastaus2_3 = {nimi: "Tentti1, Kysymys2, Vastaus3", onkoOikein: false}

let t1_vastaus3_1 = {nimi: "Tentti1, Kysymys3, Vastaus1", onkoOikein: false}
let t1_vastaus3_2 = {nimi: "Tentti1, Kysymys3, Vastaus2", onkoOikein: false}
let t1_vastaus3_3 = {nimi: "Tentti1, Kysymys3, Vastaus3", onkoOikein: false}

let t2_vastaus1_1 = {nimi: "Tentti2, Kysymys1, Vastaus1", onkoOikein: false}
let t2_vastaus1_2 = {nimi: "Tentti2, Kysymys1, Vastaus2", onkoOikein: false}
let t2_vastaus1_3 = {nimi: "Tentti2, Kysymys1, Vastaus3", onkoOikein: false}

let t2_vastaus2_1 = {nimi: "Tentti2, Kysymys2, Vastaus1", onkoOikein: false}
let t2_vastaus2_2 = {nimi: "Tentti2, Kysymys2, Vastaus2", onkoOikein: false}
let t2_vastaus2_3 = {nimi: "Tentti2, Kysymys2, Vastaus3", onkoOikein: false}

let t2_vastaus3_1 = {nimi: "Tentti2, Kysymys3, Vastaus1", onkoOikein: false}
let t2_vastaus3_2 = {nimi: "Tentti2, Kysymys3, Vastaus2", onkoOikein: false}
let t2_vastaus3_3 = {nimi: "Tentti2, Kysymys3, Vastaus3", onkoOikein: false}

let t1_kysymys1 = {nimi: "Tentti1, Kysymys1", vastaukset: [t1_vastaus1_1, t1_vastaus1_2, t1_vastaus1_3]}
let t1_kysymys2 = {nimi: "Tentti1, Kysymys2", vastaukset: [t1_vastaus2_1, t1_vastaus2_2, t1_vastaus2_3]}
let t1_kysymys3 = {nimi: "Tentti1, Kysymys3", vastaukset: [t1_vastaus3_1, t1_vastaus3_2, t1_vastaus3_3]}

let t2_kysymys1 = {nimi: "Tentti1, Kysymys1", vastaukset: [t2_vastaus1_1, t2_vastaus1_2, t2_vastaus1_3]}
let t2_kysymys2 = {nimi: "Tentti1, Kysymys2", vastaukset: [t2_vastaus2_1, t2_vastaus2_2, t2_vastaus2_3]}
let t2_kysymys3 = {nimi: "Tentti1, Kysymys3", vastaukset: [t2_vastaus3_1, t2_vastaus3_2, t2_vastaus3_3]}

let tentti1 = {nimi:"Tentti1", kysymykset: [t1_kysymys1, t1_kysymys2, t1_kysymys3]}
let tentti2 = {nimi:"Tentti2", kysymykset: [t2_kysymys1, t2_kysymys2, t2_kysymys3]}


const appData = {
  tentit: [tentti1, tentti2],
  tallennetaanko: false,
  tietoAlustettu: false
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'TENTIN_NIMI_MUUTTUI': {
      console.log("Tentin nimi muuttui ", action)
      const stateKopio = {...state, tallennetaanko: true}
      stateKopio.tentit[action.payload.tenttiIndex].nimi = action.payload.nimi
      return stateKopio
    }

    case 'KYSYMYKSEN_NIMI_MUUTTUI': {
      console.log("Kysymyksen nimi muuttui ", action)
      const stateKopio = {...state, tallennetaanko: true}
      stateKopio.tentit[action.payload.tenttiIndex].kysymykset[action.payload.kysymysIndex].nimi = action.payload.nimi
      return stateKopio
    }

    case 'VVAIHTOEHDON_NIMI_MUUTTUI': {
      console.log("Vastausvaihtoehdon nimi muuttui ", action)
      const stateKopio = {...state, tallennetaanko: true}
      stateKopio.tentit[action.payload.tenttiIndex].kysymykset[action.payload.kysymysIndex].vastaukset[action.payload.vastausIndex].nimi = action.payload.nimi
      return stateKopio 
    }

    case 'PÄIVITÄ_TALLENNUSTILA': {
      return {...state, tallennetaanko: action.payload}
    }

    case 'ALUSTA_DATA': {
      return {...action.payload, tietoAlustettu: true}
    }

    default:
      throw new Error("Reducer error...")
  }
}

function App() {

  const [tentitLista, dispatch] = useReducer(reducer, appData)

  useEffect(() => {
    const haeDataa = async() => {
      try {
        const result = await axios.get('http://localhost:8080')
        console.log(result)
        dispatch({
          type: 'ALUSTA_DATA',
          payload: result.data
        })
      } catch (error) {
        console.log("virhetilanne", error)
      }
    }
    haeDataa()
  }, [])

  useEffect(() => {
    const vieDataa = async() => {
      try {
        await axios.post('http://localhost:8080', tentitLista)
        dispatch({
          type: 'PÄIVITÄ_TALLENNUSTILA',
          payload: false
        })
      } catch (error) {
        console.log("virhetilanne", error)
      }
    }
    if(tentitLista.tallennetaanko === true){
      vieDataa()
    }
  }, [tentitLista.tallennetaanko])

  return (
    <>
      <div>
        {tentitLista.tentit.map((tentti, tenttiIndex) => 
        <Tentti 
          tenttiIndex={tenttiIndex}
          tentti={tentti}
          dispatch={dispatch}
        />)}
      </div>
    </>
  )
}

export default App;
