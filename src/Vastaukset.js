import './App.css'

const Vastaukset = (props) => {
    console.log("Vastaukset-komponentti:", props.vastaukset)
    const vvaihtoehto = props.vastaukset?.map((item) => item.nimi)
    return (
        <div>
            {vvaihtoehto}
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