import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRooms, addRoom, deleteRoom } from "../../API/Room";
import { getRoomTypes } from "../../API/RoomTypes";
import { getRoomFeatures } from "../../API/RoomFeatures";
import { getHotels } from "../../API/Hotel";
import "./Room.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Room() {
  const queryClient = useQueryClient();
  const [newRoom, setNewRoom] = useState({
    roomType: {},
    stock: 0,
    squareMeter: 0,
    personType: "",
    bedNumber: 0,
    periodStart: "",
    periodEnd: "",
    price: 0,
    roomFeatures: [],
    hotel: {},
  });

  const roomQuery = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const roomTypeQuery = useQuery({
    queryKey: ["roomTypes"],
    queryFn: getRoomTypes,
  });

  const roomFeatureQuery = useQuery({
    queryKey: ["roomFeatures"],
    queryFn: getRoomFeatures,
  });

  const hotelQuery = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  const handleAddRoom = (event) => {
    setNewRoom({
      ...newRoom,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddButton = () => {
    addRoom(newRoom).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries("rooms").then(() => {});
      }
      setNewRoom({
        roomType: {},
        stock: 0,
        squareMeter: 0,
        personType: "",
        bedNumber: 0,
        periodStart: "",
        periodEnd: "",
        price: 0,
        roomFeatures: [],
        hotel: {},
      });
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    });
  };

  const handleAddRoomFeature = (event) => {
    if (event.target.checked) {
      setNewRoom({
        ...newRoom,
        roomFeatures: [...newRoom.roomFeatures, event.target.value],
      });
    } else {
      setNewRoom({
        ...newRoom,
        roomFeatures: newRoom.roomFeatures.filter(
          (facility) => facility !== event.target.value
        ),
      });
    }
  };

  const handleDeleteButton = (event) => {
    const id = event.currentTarget.id;
    deleteRoom(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("rooms").then(() => {});
      }
    });
  };

  return (
    <div className="room-container">
      <div className="add-room-container">
        <h3>Room Add</h3>
        <div>
          <select
            name="roomType"
            required
            value={newRoom.roomType.id || ""}
            onChange={(e) =>
              setNewRoom({
                ...newRoom,
                roomType: { id: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Bir oda tipi seçiniz
            </option>
            {roomTypeQuery.data?.data?.data.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={newRoom.stock}
            onChange={handleAddRoom}
          />
          <input
            type="number"
            placeholder="Square Meter"
            name="squareMeter"
            value={newRoom.squareMeter}
            onChange={handleAddRoom}
          />
          <input
            type="text"
            placeholder="Person Type"
            name="personType"
            value={newRoom.personType}
            onChange={handleAddRoom}
          />
          <input
            type="number"
            placeholder="Bed Number"
            name="bedNumber"
            value={newRoom.bedNumber}
            onChange={handleAddRoom}
          />
          <input
            type="date"
            name="periodStart"
            value={newRoom.periodStart}
            onChange={handleAddRoom}
          />
          <input
            type="date"
            name="periodEnd"
            value={newRoom.periodEnd}
            onChange={handleAddRoom}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newRoom.price}
            onChange={handleAddRoom}
          />
          <div>
            <h4>Room Features</h4>
            {roomFeatureQuery.data?.data?.data.map((roomFeature) => (
              <div key={roomFeature.id}>
                <input
                  type="checkbox"
                  name="facilities"
                  value={roomFeature.id}
                  onChange={handleAddRoomFeature}
                />
                <label>{roomFeature.name}</label>
              </div>
            ))}
          </div>
          <select
            name="hotel"
            required
            value={newRoom.hotel.id || ""}
            onChange={(e) =>
              setNewRoom({
                ...newRoom,
                hotel: { id: e.target.value },
              })
            }
          >
            <option value="" disabled>
              Select a hotel
            </option>
            {hotelQuery.data?.data?.data.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddButton}>Add</button>
        </div>
      </div>
      <div className="rooms">
        {roomQuery.data?.data?.data.map((room) => (
          <div key={room.id} className="room">
            <div className="room-info">
              <span>Room Type: {room.roomType.name}</span>
              <span>Stock: {room.stock}</span>
              <span>Square Meter: {room.squareMeter}</span>
              <span>Person Type: {room.personType}</span>
              <span>Bed Number: {room.bedNumber}</span>
              <span>
                Period: {room.periodStart} - {room.periodEnd}
              </span>
              <span>Price: {room.price}</span>
              {room.roomFeatures && (
                <div className="roomFeatures">
                  <h4>Room Features:</h4>
                  {room.roomFeatures.map((roomFeature, index) => (
                    <div key={index} className="roomFeature">
                      <span>{roomFeature.name}</span>
                    </div>
                  ))}
                </div>
              )}
              <span>Hotel Name: {room.hotelName}</span>
              <span onClick={handleDeleteButton} id={room.id}>
                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="secondary-container">
        <div className="room-types-container">
          {roomTypeQuery.data?.data?.data.map((roomType) => (
            <div key={roomType.id} className="room-type-container">
              <div className="room-type-info">
                <span className="room-type-name">{roomType.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="room-features-container">
          {roomFeatureQuery.data?.data?.data.map((roomFeature) => (
            <div key={roomFeature.id} className="room-feature-container">
              <div className="room-feature-info">
                <span className="room-feature-name">{roomFeature.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Room;
