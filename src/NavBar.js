import axios from "axios";
import "./App.css";

const NavBar = (props) => {

  const signOut = () => {
    localStorage.removeItem("tenttisov_token");
    localStorage.removeItem("tenttisov_käyttäjä");
    props.handleTokenChange(null);
  };

  const showUser = localStorage.getItem("tenttisov_käyttäjä");

  const valitseTentti = (event) => {
    console.log("Tentin id:", event.target.value);
    props.dispatch({
      type: "VALITSE_TENTTI",
      payload: event.target.value,
    });
  };

  const lisääTentti = async(event) => {
    console.log("Lisää tentti.", event.target.value);
    try {
        const uusTentti = {nimi:"Uusi tentti", päivämäärä:"1.1.2000", onkovoimassa:"true"}
        const result = await axios.post("https://localhost:4000/tentit", uusTentti)
        console.log("db vastaus:", result)
        props.dispatch({
            type: "LISÄÄ_TENTTI",
            payload: {
                uudenTentinId: result.data.tentin_id,
                tenttiData: uusTentti
            }
          });
        console.log("Uusi tentti lisätty db:hen", result)
    } catch (error) {
        
    }
  };

  const poistaTentti = async() => {
    try {
        const result = await axios.delete(`https:localhost:4000/tentit/${props.valittuTentti}`)
        console.log("Juu: ", result)
        props.dispatch({
            type: "POISTA_TENTTI",
            payload: props.valittuTentti
          });
        console.log("Tentti poistettu.")
    } catch (error) {
        
    }
  };

  return (
    <>
      <div>
        <nav className="nav">
          <select onChange={valitseTentti}>
            <option disabled selected value>
              {" "}
              Valitse tentti{" "}
            </option>
            {props.listaTentteja?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.nimi}
              </option>
            ))}
          </select>
          <ul>
            <li className="navbar-nappulat" onClick={lisääTentti}>Lisää tentti</li>
            <li className="navbar-nappulat" onClick={poistaTentti}>Poista tentti</li>
          </ul>
          <ul>
            <li>Tietoa sovelluksesta</li>
            <li className="navbar-nappulat" id="poistu" onClick={signOut}>
              {" "}
              Poistu
            </li>
            <li className="user">{showUser}</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
