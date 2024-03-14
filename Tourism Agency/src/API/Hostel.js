import axios from "axios";

export const getHostels = async () => {
  const data = await axios.get("http://localhost:8080/v1/hostel/all");
  return data;
};
