import {
  getReservation,
  addReservation,
  deleteReservation,
  updateReservationFunc,
} from "../../API/Reservation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRooms } from "../../API/Room";
import "./Reservation.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
function Reservation() {
  const queryClient = useQueryClient();
  const [updateReservation, setUpdateReservation] = useState({});
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

  const dataReservation = [
    {
      siteName: "Person Name",
      dbName: "personName",
      type: "text",
    },
    {
      siteName: "Person Surname",
      dbName: "personSurname",
      type: "text",
    },
    {
      siteName: "Person Phone",
      dbName: "personPhone",
      type: "text",
    },
    {
      siteName: "Identification Number",
      dbName: "personTc",
      type: "text",
    },
    {
      siteName: "Start Date",
      dbName: "startDate",
      type: "date",
    },
    {
      siteName: "End Date",
      dbName: "endDate",
      type: "date",
    },
    {
      siteName: "Person Count",
      dbName: "personCount",
      type: "number",
    },
    {
      siteName: "Reservation Price",
      dbName: "reservationPrice",
    },
    {
      siteName: "Room Type",
      dbName: "room.roomType.name",
      type: "select",
      selectText: "Select a room",
      options: "roomQuery",
    },
    {
      siteName: "Room Stock",
      dbName: "room.stock",
    },
    {
      siteName: "Room Price",
      dbName: "room.price",
    },
    {
      siteName: "Hotel Name",
      dbName: "room.hotelName",
    },
    {
      siteName: "Actions",
      dbName: "actions",
      type: "icon",
    },
  ];

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
    event.stopPropagation();
    const id = event.currentTarget.id;
    deleteReservation(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("reservations").then(() => {});
      }
    });
  };

  const handleUpdateBtn = (id) => {
    if (Object.keys(updateReservation).length > 0) {
      return;
    } else {
      const reservationToUpdate = reservationQuery.data?.data?.data.find(
        (reservation) => reservation.id === id
      );

      setUpdateReservation({
        ...reservationToUpdate,
      });
    }
  };

  const handleClickAway = () => {
    console.log(updateReservation);
    if (Object.keys(updateReservation).length > 0) {
      updateReservationFunc(updateReservation).then((response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries("reservations").then(() => {});
        }
      });
      setUpdateReservation({});
    }
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
        <ClickAwayListener onClickAway={handleClickAway}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {dataReservation.map((data) => (
                    <TableCell key={data.dbName}>{data.siteName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reservationQuery.data?.data?.data.map((reservation) => (
                  <TableRow
                    key={reservation.id}
                    onClick={() => handleUpdateBtn(reservation.id)}
                    id={reservation.id}
                  >
                    {dataReservation.map((data) => (
                      <TableCell key={`tablecell${data.dbName}`}>
                        <span onClick={handleDeleteButton} id={reservation.id}>
                          {data.dbName === "actions" && (
                            <FontAwesomeIcon icon={faTrash} />
                          )}
                        </span>

                        {updateReservation.id === reservation.id &&
                        data.type === "text" ? (
                          <TextField
                            id="outlined-basic"
                            variant="standard"
                            name={data.dbName}
                            className={`${
                              updateReservation.id === reservation.id
                                ? "update"
                                : ""
                            }`}
                            value={updateReservation[data.dbName]}
                            onChange={(event) => {
                              setUpdateReservation({
                                ...updateReservation,
                                [data.dbName]: event.target.value,
                              });
                            }}
                          />
                        ) : updateReservation.id === reservation.id &&
                          data.type === "select" ? (
                          <select
                            name={data.dbName}
                            required
                            value={updateReservation[data.dbName]?.id}
                            onChange={(e) => {
                              const newObj = {
                                [data.dbName]: { id: e.target.value },
                              };
                              console.log(newObj);
                              setUpdateReservation((prev) => ({
                                ...prev,
                                ...newObj,
                              }));
                              console.log(updateReservation);
                            }}
                          >
                            <option value="" disabled>
                              {data.selectText}
                            </option>
                            {data.options === "roomQuery"
                              ? roomQuery.data?.data?.data.map((room) => (
                                  <option key={room.id} value={room.id}>
                                    {room.roomType.name} - {room.hotelName} -
                                    {room.stock}
                                  </option>
                                ))
                              : "error"}
                          </select>
                        ) : updateReservation.id === reservation.id &&
                          data.type === "number" ? (
                          <TextField
                            id="outlined-basic"
                            variant="standard"
                            name={data.dbName}
                            className={`${
                              updateReservation.id === reservation.id
                                ? "update"
                                : ""
                            }`}
                            value={updateReservation[data.dbName]}
                            onChange={(event) => {
                              setUpdateReservation({
                                ...updateReservation,
                                [data.dbName]: event.target.value,
                              });
                            }}
                          />
                        ) : updateReservation.id === reservation.id &&
                          data.type === "date" ? (
                          <TextField
                            id="outlined-basic"
                            variant="standard"
                            name={data.dbName}
                            type="date"
                            className={`${
                              updateReservation.id === reservation.id
                                ? "update"
                                : ""
                            }`}
                            value={updateReservation[data.dbName]}
                            onChange={(event) => {
                              setUpdateReservation({
                                ...updateReservation,
                                [data.dbName]: event.target.value,
                              });
                            }}
                          />
                        ) : data.dbName === "room.price" ? (
                          reservation.room.price
                        ) : data.dbName === "room.hotelName" ? (
                          reservation.room.hotelName
                        ) : data.dbName === "room.stock" ? (
                          reservation.room.stock
                        ) : data.dbName === "room.roomType.name" ? (
                          reservation.room.roomType.name
                        ) : (
                          reservation[data.dbName]
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
  );
}

export default Reservation;
