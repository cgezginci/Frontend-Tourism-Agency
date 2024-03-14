import axios from "axios";

export const getHotels = () => {
  const data = axios.get("http://localhost:8080/v1/hotel/all");
  return data;
};
