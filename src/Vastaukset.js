import './App.css'

const Vastaukset = (props) => {
    return (
        <div>
            {props.vastaukset?.nimi}
        </div>
    )
}

export default Vastaukset