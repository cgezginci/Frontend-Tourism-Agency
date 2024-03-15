import axios from "axios";

export const getReservation = async () => {
  const data = await axios.get("http://localhost:8080/v1/reservation/all");
  return data;
};
