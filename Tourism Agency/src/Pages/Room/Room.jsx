import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRooms,
  addRoom,
  deleteRoom,
  updateRoomFunc,
  getRoomByDates,
  getRoomByHotelName,
} from "../../API/Room";
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
import { Modal } from "@mui/material";

function Room() {
  const dataRoom = [
    {
      siteName: "Room Type",
      dbName: "roomType.name",
      type: "select",
      options: "roomTypeQuery",
      selectText: "Select a room type",
      selectName: "roomType",
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
      selectName: "hotel",
    },
    {
      siteName: "Actions",
      dbName: "actions",
      type: "icon",
    },
  ];
  const queryClient = useQueryClient();
  const [updateRoom, setUpdateRoom] = useState({});
  const [search, setSearch] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchRoom, setSearchRoom] = useState({
    hotelName: "",
  });
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showHotels, setShowHotels] = useState([]);
  const [showRooms, setShowRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomType: {},
    stock: "",
    squareMeter: "",
    personType: "",
    bedNumber: "",
    periodStart: "",
    periodEnd: "",
    price: "",
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
      console.log(newRoom);
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
    setIsModalOpen(false);
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
    event.stopPropagation();
    const id = event.currentTarget.id;
    deleteRoom(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("rooms").then(() => {});
      }
    });
  };

  const handleUpdateBtn = (id) => {
    if (Object.keys(updateRoom).length > 0) {
      return;
    } else {
      const roomToUpdate = roomQuery.data?.data?.data.find(
        (room) => room.id === id
      );
      const updateHotel = hotelQuery.data?.data?.data.find(
        (hotel) => hotel.name === roomToUpdate.hotelName
      );
      const updateRoomFeatures = roomToUpdate.roomFeatures.map(
        (roomFeature) => roomFeature.id
      );
      setUpdateRoom({
        ...roomToUpdate,
        hotel: { id: updateHotel.id },
        roomFeatures: updateRoomFeatures,
      });
    }
  };

  const handleClickAway = () => {
    console.log(updateRoom);
    if (Object.keys(updateRoom).length > 0) {
      updateRoomFunc(updateRoom).then((response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries("rooms").then(() => {});
        }
      });
      setUpdateRoom({});
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDateSearch = (event) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateSearchBtn = () => {
    getRoomByDates(search.startDate, search.endDate).then((response) => {
      if (response.data.success) {
        setFilteredRooms(response.data.data);
      } else {
        alert("Belirtilen tarihler arasında uygun oda bulunamadı.");
      }
    });
  };

  const handleDateReset = () => {
    setSearch({
      startDate: "",
      endDate: "",
    });
    searchRoom.hotelName = "";
    setFilteredRooms([]);
  };

  useEffect(() => {
    if (filteredRooms.length > 0) {
      setShowRooms(filteredRooms);
    } else {
      setShowRooms(roomQuery.data?.data?.data);
    }
  }, [filteredRooms, roomQuery.data]);

  const handleHotelNameSearch = (event) => {
    setSearchRoom({
      ...searchRoom,
      [event.target.name]: event.target.value,
    });
  };

  const handleHotelNameSearchBtn = () => {
    getRoomByHotelName(searchRoom.hotelName).then((response) => {
      if (response.data.success) {
        setShowRooms(response.data.data);
        setFilteredHotels(response.data.data);
      } else {
        alert("Belirtilen otelde uygun oda bulunamadı.");
      }
    });
  };

  useEffect(() => {
    if (filteredHotels.length > 0) {
      setShowHotels(filteredHotels);
    } else {
      setShowHotels(hotelQuery.data?.data?.data);
    }
  }, [filteredHotels, hotelQuery.data]);

  return (
    <div className="room-container">
      <div className="add-room-container">
        <button onClick={handleModalOpen}>Add Room</button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="room-modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="room-modal-container">
          <h2 id="room-modal-modal-title">Add Room</h2>
          <div id="room-modal-modal-description">
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

            <select
              name="hotel"
              required
              className="hotel-select"
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
            <div className="buttons">
              <button className="add-button" onClick={handleAddButton}>
                Add
              </button>
              <button className="close-button" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="room-box">
        <div className="rooms">
          <div className="room-search">
            <div>
              <input
                type="date"
                name="startDate"
                value={search.startDate}
                onChange={handleDateSearch}
              />
              <input
                type="date"
                name="endDate"
                value={search.endDate}
                onChange={handleDateSearch}
              />
              <button onClick={handleDateSearchBtn}>Search</button>
            </div>
            <div>
              <input
                type="text"
                name="hotelName"
                value={searchRoom.hotelName}
                onChange={handleHotelNameSearch}
              />
              <button onClick={handleHotelNameSearchBtn}>Search</button>
            </div>
            <button onClick={handleDateReset}>Reset</button>
          </div>

          <h1>Rooms</h1>
          <ClickAwayListener onClickAway={handleClickAway}>
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
                  {showRooms?.map((room) => (
                    <TableRow
                      key={room.id}
                      onClick={() => handleUpdateBtn(room.id)}
                      id={room.id}
                    >
                      {dataRoom.map((data) => (
                        <TableCell key={`tablecell${data.dbName}`}>
                          <span onClick={handleDeleteButton} id={room.id}>
                            {data.dbName === "actions" && (
                              <FontAwesomeIcon icon={faTrash} />
                            )}
                          </span>

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
                              value={updateRoom[data.selectName]?.id}
                              onChange={(e) => {
                                const newObj = {
                                  [data.selectName]: { id: e.target.value },
                                };
                                console.log(newObj);
                                setUpdateRoom((prev) => ({
                                  ...prev,
                                  ...newObj,
                                }));
                                console.log(updateRoom);
                              }}
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
                                ? showHotels?.map((hotel) => (
                                    <option key={hotel.id} value={hotel.id}>
                                      {hotel.name}
                                    </option>
                                  ))
                                : "error"}
                            </select>
                          ) : updateRoom.id === room.id &&
                            data.type === "number" ? (
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
                            data.type === "date" ? (
                            <TextField
                              id="outlined-basic"
                              variant="standard"
                              name={data.dbName}
                              type="date"
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
                            data.type === "checkbox" ? (
                            roomFeatureQuery.data?.data?.data.map(
                              (roomFeature) => (
                                <div key={roomFeature.id}>
                                  <input
                                    type="checkbox"
                                    checked={updateRoom.roomFeatures.find(
                                      (roomF) => roomF === roomFeature.id
                                    )}
                                    name="facilities"
                                    value={roomFeature.id}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        setUpdateRoom({
                                          ...updateRoom,
                                          roomFeatures: [
                                            ...updateRoom.roomFeatures,
                                            event.target.value,
                                          ],
                                        });
                                      } else {
                                        const newValue = parseInt(
                                          event.target.value
                                        );
                                        setUpdateRoom({
                                          ...updateRoom,
                                          roomFeatures:
                                            updateRoom.roomFeatures.filter(
                                              (facility) =>
                                                facility !== newValue
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
                              <span key={roomFeature.id}>
                                {roomFeature.name}
                              </span>
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
      </div>
      <div className="room-secondary-container">
        <div className="room-types-container">
          <h2>Room Types</h2>
          {roomTypeQuery.data?.data?.data.map((roomType) => (
            <div key={roomType.id} className="room-type-container">
              <div className="room-type-info">
                <span className="room-type-name">{roomType.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="room-features-container">
          <h2>Room Features</h2>
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
