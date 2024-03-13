import earth from "../assets/earth.jpg";
import suitcase from "../assets/suitcase.jpg";
import ticket from "../assets/ticket.jpg";

function Card() {
  return (
    <div>
      <div className="bottom-header card-container">
        <div className="left">
          <h2>TOP VALUES FOR YOU</h2>
          <p>
            Our services are designed to provide you with the best experience.
          </p>
        </div>
        <div className="card">
          <img src={earth} alt="Earth" className="card-image" />
          <h2>All in One</h2>
          <p>Total 460+ destinations that we work with.</p>
        </div>
        <div className="card">
          <img src={suitcase} alt="Suitcase" className="card-image" />
          <h2>Best Guide</h2>
          <p>Explore new horizons with our expert guides.</p>
        </div>
        <div className="card">
          <img src={ticket} alt="Ticket" className="card-image" />
          <h2>Easy Booking</h2>
          <p>Simple and hassle-free booking process.</p>
        </div>

        <div id="classes"></div>
      </div>
    </div>
  );
}

export default Card;
