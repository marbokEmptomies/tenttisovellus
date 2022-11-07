import './App.css';
import { useReducer, useEffect, useState } from 'react'
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

let t1_kysymys1 = {nimi: "Tentti1, Kysymys1", vastaukset: [t1_vastaus1_1, t1_vastaus1_2, t1_vastaus1_3]}
let t1_kysymys2 = {nimi: "Tentti1, Kysymys2", vastaukset: [t1_vastaus2_1, t1_vastaus2_2, t1_vastaus2_3]}
let t1_kysymys3 = {nimi: "Tentti1, Kysymys3", vastaukset: [t1_vastaus3_1, t1_vastaus3_2, t1_vastaus3_3]}


let tentti = {nimi:"Tentti1", kysymykset: [t1_kysymys1, t1_kysymys2, t1_kysymys3], id:1001}

const appData = {
  tentit: [tentti],
  tallennetaanko: false,
  tietoAlustettu: false,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'TENTIN_NIMI_MUUTTUI': {
      console.log("Tentin nimi muuttui ", action)
      const stateKopio = {...state}
      stateKopio.tentit[action.payload.tenttiIndex].nimi = action.payload.nimi
      return stateKopio
    }

    case 'KYSYMYKSEN_NIMI_MUUTTUI': {
      console.log("Kysymyksen nimi muuttui ", action)
      const stateKopio = {...state}
      stateKopio.tentit[action.payload.tenttiIndex].kysymykset[action.payload.kysymysIndex].nimi = action.payload.nimi
      return stateKopio
    }

    case 'VVAIHTOEHDON_NIMI_MUUTTUI': {
      console.log("Vastausvaihtoehdon nimi muuttui ", action)
      const stateKopio = {...state}
      stateKopio.tentit[action.payload.tenttiIndex].kysymykset[action.payload.kysymysIndex].vastaukset[action.payload.vastausIndex].nimi = action.payload.nimi
      return stateKopio 
    }

    case 'LISÄÄ_TENTTI': {
      console.log("Lisää tentti muuttui", action)
      const uusiId = state.tentit.length + 1
      return {...state, tentit:[...state.tentit, {nimi: "Uusi tentti", id: uusiId, kysymykset: []}]}
    }

    case 'LISÄÄ_KYSYMYS': {
      console.log("Lisää kysymys muuttui", action)
      return {...state, tentit:[...state.tentit.kysymykset, {nimi: "Uusi kysymys", vastaukset: []}]}
    }

    case 'POISTA_TENTTI': {
      console.log("Poista tentti muuttui", action)
      const uudetTentit = state.tentit.filter(item => action.payload.id !== item.id)
      return {...state, tentit:uudetTentit}
    }

    case 'PÄIVITÄ_TALLENNUSTILA': {
      console.log("Tallennustila päivitetty", action)
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
  const [valittuTentti, setValittuTentti] = useState(0)

  const tenttiNapit = tentitLista.tentit.map((item, index) => {
    return (
      <button value={index} onClick={(event) => {
        setValittuTentti(event.target.value)
      }}>{item.nimi}</button>
    )
  })

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
        <button onClick={() => dispatch({
          type: 'PÄIVITÄ_TALLENNUSTILA',
          payload: true
        })}>Tallenna muutokset</button>
        {tenttiNapit}
        {tentitLista.tentit[valittuTentti] ? 
        <Tentti 
          tenttiIndex={valittuTentti}
          tentti={tentitLista.tentit[valittuTentti]}
          dispatch={dispatch}
        /> : <h1>Ei tenttejä valittuna</h1>}
        
      </div>
      <div>
        <button onClick={() => dispatch({
          type: 'LISÄÄ_TENTTI'
        })}>Lisää uusi tentti</button>
        <button onClick={() => dispatch({
          type: 'POISTA_TENTTI',
          payload: tentitLista.tentit[valittuTentti]
        })}>Poista tentti</button>
    </div>
    </>
  )
}

export default App;
