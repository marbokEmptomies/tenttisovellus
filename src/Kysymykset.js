import './App.css'
import Vastaukset from './Vastaukset'

const Kysymykset = (props) => {
    /* console.log("kys:", props.kysymykset)*/
    
    const kysymys = props.kysymykset?.map(
        (item) => item.nimi
      );
    
    const vastaukset = props.vastaukset
    return (
        <>
            <div>
                {/* <h3>Kysymykset: </h3> */}
                <h4>{kysymys}</h4>
                <Vastaukset vastaukset={vastaukset} />
            </div>
                {/* <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'KYSYMYKSEN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                        }
                    })
                }} /> */}
            <div>
                {/* <div>
                    <h4>Vastausvaihtoehdot:</h4>
                    <p>{props.vastaukset}</p>
                </div> */}
            </div>
        </>
    )
}

export default Kysymykset