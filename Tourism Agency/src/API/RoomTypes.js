import axios from "axios";

export const getRoomTypes = async () => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "v1/room-types/all"
  );
  return data;
};
