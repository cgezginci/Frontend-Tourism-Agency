import axios from "axios";

export const getHotels = async () => {
  const data = await axios.get("http://localhost:8080/v1/hotel/all");
  return data;
};
