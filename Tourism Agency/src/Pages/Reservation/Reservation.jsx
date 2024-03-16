import {
  getReservation,
  addReservation,
  deleteReservation,
} from "../../API/Reservation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRooms } from "../../API/Room";
import "./Reservation.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Reservation() {
  const queryClient = useQueryClient();

  const [newReservation, setNewReservation] = useState({
    personName: "",
    personSurname: "",
    personPhone: "",
    personTc: "",
    startDate: "",
    endDate: "",
    personCount: 0,
    room: {},
  });

  const reservationQuery = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservation,
  });

  const roomQuery = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleAddReservation = (event) => {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddButton = () => {
    addReservation(newReservation).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries("reservations").then(() => {});
      }
      setNewReservation({
        personName: "",
        personSurname: "",
        personPhone: "",
        personTc: "",
        startDate: "",
        endDate: "",
        personCount: 0,
        room: {},
      });
    });
  };

  const handleDeleteButton = (event) => {
    const id = event.currentTarget.id;
    deleteReservation(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("reservations").then(() => {});
      }
    });
  };

  return (
    <div>
      <div className="add-reservation-container">
        <h1>Add Reservation</h1>
        <input
          type="text"
          placeholder="Person Name"
          name="personName"
          value={newReservation.personName}
          onChange={handleAddReservation}
        />
        <input
          type="text"
          placeholder="Person Surname"
          name="personSurname"
          value={newReservation.personSurname}
          onChange={handleAddReservation}
        />
        <input
          type="text"
          placeholder="Person Phone"
          name="personPhone"
          value={newReservation.personPhone}
          onChange={handleAddReservation}
        />
        <input
          type="text"
          placeholder="Identification Number "
          name="personTc"
          value={newReservation.personTc}
          onChange={handleAddReservation}
        />
        <input
          type="date"
          name="startDate"
          value={newReservation.startDate}
          onChange={handleAddReservation}
        />
        <input
          type="date"
          name="endDate"
          value={newReservation.endDate}
          onChange={handleAddReservation}
        />
        <input
          type="number"
          placeholder="Person Count"
          name="personCount"
          value={newReservation.personCount}
          onChange={handleAddReservation}
        />
        <select
          name="room"
          required
          value={newReservation.room.id || ""}
          onChange={(e) =>
            setNewReservation({
              ...newReservation,
              room: { id: e.target.value },
            })
          }
        >
          <option value="" disabled>
            Select a room
          </option>
          {roomQuery.data?.data?.data.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomType.name} - {room.hotelName} - {room.price}
            </option>
          ))}
        </select>
        <button onClick={handleAddButton}>Add</button>
      </div>
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
              <span onClick={handleDeleteButton} id={reservation.id}>
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
