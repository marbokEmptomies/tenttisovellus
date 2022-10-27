import './App.css'
import Vastaukset from './Vastaukset'

const Kysymykset = (props) => {
    return (
        <>
            <div>Kysymykset: {props.kysymys.nimi}</div>
                <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'KYSYMYKSEN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                            tenttiIndex: props.tenttiIndex,
                            kysymysIndex: props.kysymysIndex
                        }
                    })
                }} />
            <div>
                <div>{props.kysymys.vastaukset.map((vastaus, index) =>
                <Vastaukset 
                    dispatch={props.dispatch}
                    tenttiIndex={props.tenttiIndex}
                    kysymysIndex={props.kysymysIndex}
                    vastausIndex={index}
                    vastaus={vastaus}
                />)}
                </div>
            </div>
        </>
    )
}

export default Kysymykset