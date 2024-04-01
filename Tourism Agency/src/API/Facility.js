import axios from "axios";

export const getFacilities = async () => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "v1/facility/all"
  );
  return data;
};
