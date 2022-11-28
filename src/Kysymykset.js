import './App.css'
import Vastaukset from './Vastaukset'

const Kysymykset = (props) => {
    return (
        <>
            <div><h3>Kysymykset: {props.kysymykset}</h3></div>
                {/* <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'KYSYMYKSEN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                        }
                    })
                }} /> */}
            <div>
                <div>
                    <h4>Vastausvaihtoehdot:</h4>
                    <p>{props.vastaukset}</p>
                </div>
            </div>
        </>
    )
}

export default Kysymykset