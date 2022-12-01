import "./App.css";

const NavBar = (props) => {
  const signOut = () => {
    localStorage.removeItem("tenttisov_token");
    localStorage.removeItem("tenttisov_käyttäjä");
    props.handleTokenChange(null);
  };

  const showUser = localStorage.getItem("tenttisov_käyttäjä");

  const valitseTentti = (event) => {
    console.log(event.target.value);
    props.dispatch({
      type: "VALITSE_TENTTI",
      payload: event.target.value,
    });
  };

  const opeMenu = (event) => {
    console.log("Lisää tentti.", event.target.value);
    props.dispatch({
      type: "LISÄÄ_TENTTI",
      payload: event.target.value,
    });
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
          <select onChange={opeMenu}>
            <option disabled selected value>
              {" "}
              Työkalut{" "}
            </option>
            <option>Lisää tentti</option>
            <option>Poista tentti</option>
          </select>
          <ul>
            <li>Tietoa sovelluksesta</li>
            <li className="navbar-nappulat" onClick={signOut}>
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
