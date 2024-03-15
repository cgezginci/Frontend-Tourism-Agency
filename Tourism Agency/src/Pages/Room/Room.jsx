import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../API/Room";
import { getRoomTypes } from "../../API/RoomTypes";
import { getRoomFeatures } from "../../API/RoomFeatures";
import "./Room.css";

function Room() {
  const [newRoom, setNewRoom] = useState({
    roomType: { id: "" },
    stock: "",
    squareMeter: "",
    personType: "",
    bedNumber: "",
    periodStart: "",
    periodEnd: "",
    price: "",
    roomFeatures: [],
    hotel: { id: "" },
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

  const handleAddRoom = () => {};

  return (
    <div className="room-container">
      <div>
        <h3>Room Add</h3>
        <div>
          <select name="" id="">
            <option value="">Select A Type</option>
            {roomTypeQuery.data?.data?.data.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Stock" />
          <input type="text" placeholder="Square Meter" />
          <input type="text" placeholder="Person Type" />
          <input type="text" placeholder="Bed Number" />
          <input type="date" />
          <input type="date" />
          <input type="text" placeholder="Price" />
          <div>
            {roomFeatureQuery.data?.data?.data.map((roomFeature) => (
              <label key={roomFeature.id} htmlFor="">
                <input
                  type="checkbox"
                  checked={newRoom.roomFeatures.some(
                    (feature) => feature.id === roomFeature.id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewRoom({
                        ...newRoom,
                        roomFeatures: [
                          ...newRoom.roomFeatures,
                          { id: roomFeature.id },
                        ],
                      });
                    } else {
                      setNewRoom({
                        ...newRoom,
                        roomFeatures: newRoom.roomFeatures.filter(
                          (roomFeature) => roomFeature.id !== roomFeature.id
                        ),
                      });
                    }
                  }}
                />
                {roomFeature.name}
              </label>
            ))}
          </div>
          <select name="" id="">
            <option value="">Select An Hotel</option>
            {roomQuery.data?.data?.data.map((room) => (
              <option key={room.id} value={room.id}>
                {room.hotelName}
              </option>
            ))}
          </select>
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
