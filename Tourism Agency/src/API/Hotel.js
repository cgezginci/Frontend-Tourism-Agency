import axios from "axios";

export const getHotels = async () => {
  const data = await axios.get("http://localhost:8080/v1/hotel/all");
  return data;
};

export const addHotel = async (hotel) => {
  const data = await axios.post("http://localhost:8080/v1/hotel", hotel);
  return data;
};

export const deleteHotel = async (id) => {
  const data = await axios.delete(`http://localhost:8080/v1/hotel/${id}`);
  return data;
};
