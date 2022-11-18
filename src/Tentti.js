import './App.css'
import Kysymykset from './Kysymykset'

const Tentti = (props) => {
    
    return (
        <>
            <div>
                <h1>Tentin nimi: {props.tentti.nimi}</h1>
            </div>
                <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'TENTIN_NIMI_MUUTTUI',
                        payload: {
                            nimi: event.target.value,
                            tenttiIndex: props.tenttiIndex
                        }
                    })
                }}
                //value = {props.tentti.nimi} 
                />
            <div>
                <div>
                    {/* {props.tentti.kysymykset.map((kysymys, index) =>
                    <Kysymykset 
                        dispatch={props.dispatch} 
                        tenttiIndex = {props.tenttiIndex} 
                        kysymysIndex = {index}
                        kysymys = {kysymys}
                    />)}  */}
                </div>
            </div>
        </>
    )       
}

export default Tentti