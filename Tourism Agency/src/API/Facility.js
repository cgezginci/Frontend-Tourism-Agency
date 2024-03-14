import axios from "axios";

export const getFacilities = async () => {
  const data = await axios.get("http://localhost:8080/v1/facility/all");
  return data;
};
