import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getHotels,
  addHotel,
  deleteHotel,
  updateHotelFunc,
  getHotelByName,
} from "../../API/Hotel";
import { getHostels } from "../../API/Hostel";
import { getFacilities } from "../../API/Facility";
import { useEffect, useState } from "react";
import "./Hotel.css";
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
import { Modal } from "@mui/material";
import hostelData from "../../Helper/Hostels";

function Hotel() {
  const dataHotel = [
    {
      siteName: "Name",
      dbName: "name",
      type: "text",
    },
    {
      siteName: "City",
      dbName: "city",
      type: "text",
    },
    {
      siteName: "Location",
      dbName: "loc",
      type: "text",
    },
    {
      siteName: "Address",
      dbName: "address",
      type: "text",
    },
    {
      siteName: "Phone",
      dbName: "phone",
      type: "text",
    },
    {
      siteName: "Email",
      dbName: "email",
      type: "text",
    },
    {
      siteName: "Star",
      dbName: "star",
      type: "number",
    },
    {
      siteName: "Hostels",
      dbName: "hostels.name",
      type: "checkbox",
      options: "hostelQuery",
    },
    {
      siteName: "Facilities",
      dbName: "facilities.name",
      type: "checkbox",
      options: "facilityQuery",
    },
    {
      siteName: "Actions",
      dbName: "actions",
      type: "icon",
    },
  ];

  const [searchHotel, setSearchHotel] = useState({
    name: "",
  });
  const queryClient = useQueryClient();
  const [filterHotel, setFilterHotel] = useState([]);
  const [showHotel, setShowHotel] = useState([]);
  const [updateHotel, setUpdateHotel] = useState({});
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    loc: "",
    address: "",
    phone: "",
    email: "",
    star: "",
    hostels: [],
    facilities: [],
  });

  const hotelQuery = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });

  const hostelQuery = useQuery({
    queryKey: ["hostels"],
    queryFn: getHostels,
  });

  const facilityQuery = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });

  const handleAddHotel = (event) => {
    setNewHotel({ ...newHotel, [event.target.name]: event.target.value });
  };

  const handleAddButton = () => {
    addHotel(newHotel).then((response) => {
      if (response.status === 201) {
        queryClient.invalidateQueries("hotels").then(() => {});
      }
    });
    setNewHotel({
      name: "",
      city: "",
      loc: "",
      address: "",
      phone: "",
      email: "",
      star: 0,
      hostels: [],
      facilities: [],
    });
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    setIsModalOpen(false);
  };

  const handleHostel = (event) => {
    if (event.target.checked) {
      setNewHotel({
        ...newHotel,
        hostels: [...newHotel.hostels, event.target.value],
      });
    } else {
      setNewHotel({
        ...newHotel,
        hostels: newHotel.hostels.filter(
          (hostel) => hostel !== event.target.value
        ),
      });
    }
  };

  const handleFacility = (event) => {
    if (event.target.checked) {
      setNewHotel({
        ...newHotel,
        facilities: [...newHotel.facilities, event.target.value],
      });
    } else {
      setNewHotel({
        ...newHotel,
        facilities: newHotel.facilities.filter(
          (facility) => facility !== event.target.value
        ),
      });
    }
  };

  const handleDeleteButton = (event) => {
    event.stopPropagation();
    const id = event.currentTarget.id;
    deleteHotel(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("hotels").then(() => {});
      }
    });
  };

  const handleUpdateBtn = (id) => {
    if (Object.keys(updateHotel).length > 0) {
      return;
    } else {
      const hotelToUpdate = hotelQuery.data?.data?.data.find(
        (hotel) => hotel.id === id
      );

      const updateHostels = hotelToUpdate.hostels.map((hostel) => hostel.id);
      const updateFacilities = hotelToUpdate.facilities.map(
        (facilities) => facilities.id
      );

      setUpdateHotel({
        ...hotelToUpdate,
        hostels: updateHostels,
        facilities: updateFacilities,
      });
    }
  };

  const handleClickAway = () => {
    if (Object.keys(updateHotel).length > 0) {
      updateHotelFunc(updateHotel).then((response) => {
        if (response.status === 200) {
          queryClient.invalidateQueries("hotels").then(() => {});
        }
      });
      setUpdateHotel({});
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearchInput = (event) => {
    setSearchHotel(event.target.value);
    if (event.target.value === "") {
      setFilterHotel([]);
    }
  };

  const handleSearchButton = () => {
    getHotelByName(searchHotel).then((response) => {
      if (response.data.success) {
        setShowHotel(response.data.data);
        setFilterHotel(response.data.data);
      } else {
        alert("Otel Bulunamadı");
      }
    });
  };

  const handleResetBtn = () => {
    setSearchHotel({ name: "" });
    setFilterHotel([]);
    setShowHotel(hotelQuery.data?.data?.data);
  };

  useEffect(() => {
    if (hotelQuery.isSuccess) {
      setShowHotel(hotelQuery.data?.data?.data);
    }
  }, [hotelQuery.isSuccess, hotelQuery.data]);

  return (
    <div className="hotel-container">
      <div className="add-hotel-container">
        <button onClick={handleModalOpen}>+ Add Hotel</button>
      </div>
      <div className="add-hotel-container"></div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="hotel-modal-modal-title"
        aria-describedby="hotel-modal-modal-description"
      >
        <div className="hotel-modal-container">
          <h2 id="hotel-modal-modal-title">Add Hotel</h2>
          <div id="hotel-modal-modal-description">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newHotel.name}
              onChange={handleAddHotel}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newHotel.city}
              onChange={handleAddHotel}
            />
            <input
              type="text"
              name="loc"
              placeholder="Location"
              value={newHotel.loc}
              onChange={handleAddHotel}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newHotel.address}
              onChange={handleAddHotel}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newHotel.phone}
              onChange={handleAddHotel}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newHotel.email}
              onChange={handleAddHotel}
            />
            <input
              className="star-input"
              type="number"
              name="star"
              placeholder="Star"
              value={newHotel.star}
              onChange={handleAddHotel}
            />
            <div>
              <h4>Hostels</h4>
              {hostelQuery.data?.data?.data.map((hostel) => (
                <div key={hostel.id}>
                  <input
                    type="checkbox"
                    name="hostels"
                    value={hostel.id}
                    onChange={handleHostel}
                  />
                  <label>{hostel.name}</label>
                </div>
              ))}
            </div>
            <div>
              <h4>Facilities</h4>
              {facilityQuery.data?.data?.data.map((facility) => (
                <div key={facility.id}>
                  <input
                    type="checkbox"
                    name="facilities"
                    value={facility.id}
                    onChange={handleFacility}
                  />
                  <label>{facility.name}</label>
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
      <div className="hotel-box">
        <div className="hotels">
          <h1>Hotels</h1>
          <div className="hotel-search">
            <input
              type="text"
              placeholder="Search Hotel"
              value={searchHotel.name}
              onChange={handleSearchInput}
            />
            <button onClick={handleSearchButton}>Search</button>
            <button onClick={handleResetBtn}>Reset</button>
          </div>
          <ClickAwayListener onClickAway={handleClickAway}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {dataHotel.map((data) => (
                      <TableCell key={data.dbName}>{data.siteName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showHotel?.map((hotel) => (
                    <TableRow
                      key={hotel.id}
                      onClick={() => handleUpdateBtn(hotel.id)}
                      id={hotel.id}
                    >
                      {dataHotel?.map((data) => (
                        <TableCell key={`tablecell${data.dbName}`}>
                          {data.dbName === "actions" && (
                            <span onClick={handleDeleteButton} id={hotel.id}>
                              <FontAwesomeIcon icon={faTrash} />
                            </span>
                          )}
                          {updateHotel.id === hotel.id &&
                          data.type === "text" ? (
                            <TextField
                              id="outlined-basic"
                              variant="standard"
                              name={data.dbName}
                              className={`${
                                updateHotel.id === hotel.id ? "update" : ""
                              }`}
                              value={updateHotel[data.dbName]}
                              onChange={(event) => {
                                setUpdateHotel({
                                  ...updateHotel,
                                  [data.dbName]: event.target.value,
                                });
                              }}
                            />
                          ) : updateHotel.id === hotel.id &&
                            data.type === "checkbox" ? (
                            data.options === "hostelQuery" ? (
                              hostelQuery?.data?.data?.data.map((hostel) => (
                                <div key={hostel.id}>
                                  <input
                                    type="checkbox"
                                    checked={updateHotel.hostels.find(
                                      (hostelH) => hostelH === hostel.id
                                    )}
                                    name="hostels"
                                    value={hostel.id}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        setUpdateHotel({
                                          ...updateHotel,
                                          hostels: [
                                            ...updateHotel.hostels,
                                            event.target.value,
                                          ],
                                        });
                                      } else {
                                        const newValue = parseInt(
                                          event.target.value
                                        );
                                        setUpdateHotel({
                                          ...updateHotel,
                                          hostels: updateHotel.hostels.filter(
                                            (hostel) => hostel !== newValue
                                          ),
                                        });
                                      }
                                    }}
                                  />
                                  <label>{hostel.name}</label>
                                </div>
                              ))
                            ) : (
                              facilityQuery?.data?.data?.data.map(
                                (facility) => (
                                  <div key={facility.id}>
                                    <input
                                      type="checkbox"
                                      checked={updateHotel.facilities.find(
                                        (hostelF) => hostelF === facility.id
                                      )}
                                      name="facilities"
                                      value={facility.id}
                                      onChange={(event) => {
                                        if (event.target.checked) {
                                          setUpdateHotel({
                                            ...updateHotel,
                                            facilities: [
                                              ...updateHotel.facilities,
                                              event.target.value,
                                            ],
                                          });
                                        } else {
                                          const newValue = parseInt(
                                            event.target.value
                                          );
                                          setUpdateHotel({
                                            ...updateHotel,
                                            facilities:
                                              updateHotel.facilities.filter(
                                                (facility) =>
                                                  facility !== newValue
                                              ),
                                          });
                                        }
                                      }}
                                    />
                                    <label>{facility.name}</label>
                                  </div>
                                )
                              )
                            )
                          ) : data.dbName === "hostels.name" ? (
                            hotel.hostels.map((hostel) => (
                              <span key={hostel.id}>{hostel.name}</span>
                            ))
                          ) : data.dbName === "facilities.name" ? (
                            hotel.facilities.map((facilities) => (
                              <span key={facilities.id}>{facilities.name}</span>
                            ))
                          ) : (
                            hotel[data.dbName]
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

      <div className="secondary-container">
        <div className="hostels-container">
          <h2>Hostels</h2>
          {hostelQuery.data?.data?.data.map((hostel) => (
            <div key={hostel.id} className="hostel-container">
              <div className="hostel-info">
                <span className="hostel-name">{hostel.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="facilities-container">
          <h2>Facilities</h2>
          {facilityQuery.data?.data?.data.map((facility) => (
            <div key={facility.id} className="facility-container">
              <div className="facility-info">
                <span className="facility-name">{facility.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotel;
