import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const stylePosition = location.pathname.includes("/home");
  return (
    <div>
      <nav
        id="menu"
        style={
          stylePosition
            ? { position: "absolute", backgroundColor: "transparent" }
            : {}
        }
      >
        <div className="nav-img">
          <img src={logo} alt="Logo" />
        </div>

        <div className="menu">
          <ul className="nav-menu">
            <Link to="/home">Home</Link>
            <Link to="/hotel">Hotel</Link>
            <Link to="/room">Room</Link>
            <Link to="/reservation">Reservation</Link>
            <Link to="/gallery">Gallery</Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
