import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHotels } from "../../API/Hotel";
import { getHostels } from "../../API/Hostel";
import { getFacilities } from "../../API/Facility";
import "./Hotel.css";

function Hotel() {
  // refetch için kullanılır
  const queryClient = useQueryClient();

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

  const handleUpdate = () => {
    // Aynı jsx içinde
    hotelQuery.refetch();
    hostelQuery.refetch();
    facilityQuery.refetch();
    // global query key ile
    queryClient.invalidateQueries("hotels", "hostels", "facilities");
  };

  return (
    <div className="hotel-container">
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
