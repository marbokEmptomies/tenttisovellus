import './App.css'

const Vastaukset = (props) => {
    return (
        <div>
            {props.vastaus.nimi}
            <input type="text" onChange={(event) => {
                {props.dispatch({
                    type: "VVAIHTOEHDON_NIMI_MUUTTUI",
                    payload: {
                        nimi: event.target.value,
                        vastausIndex: props.vastausIndex,
                        kysymysIndex: props.kysymysIndex,
                        tenttiIndex: props.tenttiIndex
                    }
                })}
            }}
            //value = {props.vastaus.nimi} 
            />
        </div>
    )
}

export default Vastaukset