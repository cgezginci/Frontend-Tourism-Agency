import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRooms, addRoom, deleteRoom } from "../../API/Room";
import { getRoomTypes } from "../../API/RoomTypes";
import { getRoomFeatures } from "../../API/RoomFeatures";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { getHotels } from "../../API/Hotel";
import "./Room.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Tab } from "@mui/material";

function Room() {
  const dataRoom = [
    {
      siteName: "Room Type",
      dbName: "roomType.name",
      type: "select",
      options: "roomTypeQuery",
      selectText: "Select a room type",
    },
    { siteName: "Stock", dbName: "stock", type: "number" },
    { siteName: "Square Meter", dbName: "squareMeter", type: "number" },
    { siteName: "Person Type", dbName: "personType", type: "text" },
    { siteName: "Bed Number", dbName: "bedNumber", type: "number" },
    { siteName: "Period Start", dbName: "periodStart", type: "date" },
    { siteName: "Period End", dbName: "periodEnd", type: "date" },
    { siteName: "Price", dbName: "price", type: "number" },
    {
      siteName: "Room Features",
      dbName: "roomFeatures.name",
      type: "checkbox",
      options: "roomFeatureQuery",
    },
    {
      siteName: "Hotel",
      dbName: "hotelName",
      type: "select",
      selectText: "Select a hotel",
      options: "hotelQuery",
    },
  ];
  const queryClient = useQueryClient();
  const [updateRoom, setUpdateRoom] = useState({});
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

  const handleUpdateBtn = (id) => {
    console.log(id);
    const newObj = roomQuery.data?.data?.data.find(
      (room) => room.id === parseInt(id)
    );
    const hotelId = hotelQuery.data?.data?.data.find(
      (hotel) => hotel.name === newObj.hotelName
    );
    newObj.hotel = { id: hotelId.id };
    console.log(newObj);
    setUpdateRoom({ ...newObj });
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
                  checked={newRoom.roomFeatures.find(
                    (roomF) => roomF.id === roomFeature.id
                  )}
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
            value={newRoom.hotel?.id || ""}
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
        <ClickAwayListener onClickAway={() => setUpdateRoom({})}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {dataRoom.map((data) => (
                    <TableCell key={data.dbName}>{data.siteName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {roomQuery.data?.data?.data.map((room) => (
                  <TableRow
                    key={room.id}
                    onClick={() => handleUpdateBtn(room.id)}
                    id={room.id}
                  >
                    {dataRoom.map((data) => (
                      <TableCell key={`tablecell${data.dbName}`}>
                        {updateRoom.id === room.id && data.type === "text" ? (
                          <TextField
                            id="outlined-basic"
                            variant="standard"
                            name={data.dbName}
                            className={`${
                              updateRoom.id === room.id ? "update" : ""
                            }`}
                            value={updateRoom[data.dbName]}
                            onChange={(event) => {
                              setUpdateRoom({
                                ...updateRoom,
                                [data.dbName]: event.target.value,
                              });
                            }}
                          />
                        ) : updateRoom.id === room.id &&
                          data.type === "select" ? (
                          <select
                            name={data.dbName}
                            required
                            value={updateRoom[data.dbName]?.id || ""}
                            onChange={(e) =>
                              setUpdateRoom({
                                ...updateRoom,
                                [data.dbName]: { id: e.target.value },
                              })
                            }
                          >
                            <option value="" disabled>
                              {data.selectText}
                            </option>
                            {data.options === "roomTypeQuery"
                              ? roomTypeQuery.data?.data?.data.map(
                                  (roomType) => (
                                    <option
                                      key={roomType.id}
                                      value={roomType.id}
                                    >
                                      {roomType.name}
                                    </option>
                                  )
                                )
                              : data.options === "hotelQuery"
                              ? hotelQuery.data?.data?.data.map((hotel) => (
                                  <option key={hotel.id} value={hotel.id}>
                                    {hotel.name}
                                  </option>
                                ))
                              : "error"}
                          </select>
                        ) : updateRoom.id === room.id &&
                          data.type === "checkbox" ? (
                          roomFeatureQuery.data?.data?.data.map(
                            (roomFeature) => (
                              <div key={roomFeature.id}>
                                <input
                                  type="checkbox"
                                  checked={updateRoom.roomFeatures.find(
                                    (roomF) => roomF.id === roomFeature.id
                                  )}
                                  name="facilities"
                                  value={roomFeature.id}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      setUpdateRoom({
                                        ...updateRoom,
                                        roomFeatures: [
                                          ...updateRoom.roomFeatures,
                                          { id: event.target.value },
                                        ],
                                      });
                                    } else {
                                      setUpdateRoom({
                                        ...updateRoom,
                                        roomFeatures:
                                          updateRoom.roomFeatures.filter(
                                            (facility) =>
                                              facility.id !== event.target.value
                                          ),
                                      });
                                    }
                                  }}
                                />
                                <label>{roomFeature.name}</label>
                              </div>
                            )
                          )
                        ) : data.dbName === "roomFeatures.name" ? (
                          room.roomFeatures.map((roomFeature) => (
                            <span key={roomFeature.id}>{roomFeature.name}</span>
                          ))
                        ) : data.dbName === "roomType.name" ? (
                          room.roomType.name
                        ) : (
                          room[data.dbName]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ClickAwayListener>
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
