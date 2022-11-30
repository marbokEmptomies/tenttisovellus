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

  return (
    <>
      <div>
        <nav className="nav">
          <ul>
            <select onChange={valitseTentti}>
              <option disabled selected value>
                {" "}
                -- Valitse tentti --{" "}
              </option>
              {props.listaTentteja?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.nimi}
                </option>
              ))}
            </select>
            <li>Tietoa sovelluksesta</li>
            <li>
              <button onClick={signOut}>Poistu</button>
            </li>
            <li>{showUser}</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
