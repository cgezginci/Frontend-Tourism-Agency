import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <div className="home">
        <div className="header-section">
          <div className="header home" id="home">
            <div className="top-header">
              <div className="menu-bg" id="menu-bg"></div>
              <div className="content">
                <h1>LIVE YOUR ADVENTURE</h1>
                <p>
                  Embrace your journey, let every step be an exploration. Find
                  the beauty in every moment, the rhythm of life pulsating
                  within you. Discover the unknown, for it is there where you'll
                  find your true essence. Feel the wind against your skin, the
                  earth beneath your feet, and let your spirit soar. Your
                  adventure awaits, embrace it with open arms.
                </p>
                <div className="buttons">
                  <button className="st-button">Let's Travel</button>
                  <button className="nd-button">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more">
          <p>Scroll For More</p>
          <FontAwesomeIcon icon={faPlaneArrival} />
        </div>
      </div>
      <Card />
    </div>
  );
}

export default Home;
