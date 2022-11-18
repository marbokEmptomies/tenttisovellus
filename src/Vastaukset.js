import './App.css'

const Vastaukset = (props) => {
    return (
        <div>
            {props.vastaukset.nimi}
            {/* <input type="text" onChange={(event) => {
                {props.dispatch({
                    type: "VVAIHTOEHDON_NIMI_MUUTTUI",
                    payload: {
                        nimi: event.target.value,
                    }
                })}
            }}
            //value = {props.vastaus.nimi} 
            /> */}
        </div>
    )
}

export default Vastaukset