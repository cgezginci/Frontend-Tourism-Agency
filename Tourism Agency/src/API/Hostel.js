import axios from "axios";

export const getHostels = async () => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "v1/hostel/all"
  );
  return data;
};
