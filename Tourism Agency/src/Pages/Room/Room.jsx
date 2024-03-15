import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../API/Room";
import { getRoomTypes } from "../../API/RoomTypes";
import { getRoomFeatures } from "../../API/RoomFeatures";
import "./Room.css";

function Room() {
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

  return (
    <div className="room-container">
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
