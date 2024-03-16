import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHotels, addHotel, deleteHotel } from "../../API/Hotel";
import { getHostels } from "../../API/Hostel";
import { getFacilities } from "../../API/Facility";
import { useState } from "react";
import "./Hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Hotel() {
  const queryClient = useQueryClient();

  const [newHotel, setNewHotel] = useState({
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
    const id = event.currentTarget.id;
    deleteHotel(id).then((response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries("hotels").then(() => {});
      }
    });
  };

  return (
    <div className="hotel-container">
      <div className="add-hotel-container">
        <h1>Add Hotel</h1>
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
        <button onClick={handleAddButton}>Add</button>
      </div>
      <div className="hotels">
        {hotelQuery.data?.data?.data.map((hotel) => (
          <div key={hotel.id} className="hotel">
            <div className="hotel-info">
              <span>Name: {hotel.name}</span>
              <span>City: {hotel.city}</span>
              <span>Location: {hotel.loc}</span>
              <span>Address: {hotel.address}</span>
              <span>Phone: {hotel.phone}</span>
              <span>Email: {hotel.email}</span>
              <span>Star: {hotel.star}</span>
            </div>
            {hotel.hostels && (
              <div className="hostels">
                <h4>Hostels:</h4>
                {hotel.hostels.map((hostel, index) => (
                  <div key={index} className="hostel">
                    <span>{hostel.name}</span>
                  </div>
                ))}
              </div>
            )}
            {hotel.facilities && (
              <div className="facilities">
                <h4>Facilities:</h4>
                {hotel.facilities.map((facility, index) => (
                  <div key={index} className="facility">
                    <span>{facility.name}</span>
                  </div>
                ))}
              </div>
            )}
            <span onClick={handleDeleteButton} id={hotel.id}>
              <FontAwesomeIcon icon={faTrash} className="delete-icon" />
            </span>
          </div>
        ))}
      </div>
      <div className="secondary-container">
        <div className="hostels-container">
          {hostelQuery.data?.data?.data.map((hostel) => (
            <div key={hostel.id} className="hostel-container">
              <div className="hostel-info">
                <span className="hostel-name">{hostel.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="facilities-container">
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
