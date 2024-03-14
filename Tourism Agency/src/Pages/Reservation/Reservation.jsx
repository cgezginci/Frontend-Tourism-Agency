import { getReservation } from "../../API/Reservation";
import { useQuery } from "@tanstack/react-query";
import "./Reservation.css";

function Reservation() {
  const reservationQuery = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservation,
  });

  return (
    <div>
      <div className="reservations">
        {reservationQuery.data?.data?.data.map((reservation) => (
          <div key={reservation.id} className="reservation">
            <div className="reservation-info">
              <span>Person Name: {reservation.personName}</span>
              <span>Person Surname: {reservation.personSurname}</span>
              <span>Person Phone: {reservation.personPhone}</span>
              <span>Person TC: {reservation.personTc}</span>
              <span>Start Date: {reservation.startDate}</span>
              <span>End Date: {reservation.endDate}</span>
              <span>Person Count: {reservation.personCount}</span>
              <span>Reservation Price: {reservation.reservationPrice}</span>
              <span>Room Type: {reservation.room.roomType.name}</span>
              <span>Room Stock: {reservation.room.stock}</span>
              <span>Room Square Meter: {reservation.room.squareMeter}</span>
              <span>Room Person Type: {reservation.room.personType}</span>
              <span>Room Bed Number: {reservation.room.bedNumber}</span>
              <span>
                Room Period: {reservation.room.periodStart} /
                {reservation.room.periodEnd}
              </span>
              <span>Room Price: {reservation.room.price}</span>
              <span>Hotel Name: {reservation.room.hotelName}</span>
              <h4>Room Features:</h4>
              <div className="room-features">
                {reservation.room.roomFeatures.map((feature) => (
                  <span key={feature.id} className="room-feature">
                    {feature.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
