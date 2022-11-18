import './App.css'
import Vastaukset from './Vastaukset'

const Kysymykset = (props) => {
    return (
        <>
            <div>Kysymykset: {props.kysymykset.nimi}</div>
                {/* <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'KYSYMYKSEN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                        }
                    })
                }} /> */}
            <div>
                <div>{props.kysymykset.vastaukset?.map((vastaukset) =>
                <Vastaukset 
                    dispatch={props.dispatch}
                    vastaukset={props.kysymykset.vastaukset}
                />)}
                </div>
            </div>
        </>
    )
}

export default Kysymykset