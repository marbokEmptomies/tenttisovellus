import './App.css'
import Kysymykset from './Kysymykset'

const Tentti = (props) => {
    
    return (
        <>
            <div>
                <h1>Tentin nimi: {props.tentti.tentti?.nimi}</h1>
            </div>
                {/* <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'TENTIN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                            tenttiIndex: props.tenttiIndex
                        }
                    })
                }}
                //value = {props.tentti.nimi} 
                /> */}
            <div>
                <div>
                    {props.tentti.kysymykset?.map((kysymykset) =>
                    <Kysymykset 
                        dispatch={props.dispatch}  
                        kysymykset = {kysymykset}
                        vastaukset = {props.tentti.vastaukset}
                    />)} 
                </div>
            </div>
        </>
    )       
}

export default Tentti