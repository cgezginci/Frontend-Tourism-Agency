import axios from "axios";

export const getRooms = async () => {
  const data = await axios.get("http://localhost:8080/v1/room/all");
  return data;
};
