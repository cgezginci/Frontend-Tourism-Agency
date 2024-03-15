import axios from "axios";

export const getRoomTypes = async () => {
  const data = await axios.get("http://localhost:8080/v1/room-types/all");
  return data;
};
