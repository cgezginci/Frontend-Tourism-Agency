import axios from "axios";

export const getRoomFeatures = async () => {
  const data = await axios.get("http://localhost:8080/v1/room-features/all");
  return data;
};
