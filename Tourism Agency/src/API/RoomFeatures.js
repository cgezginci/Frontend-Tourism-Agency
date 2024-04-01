import axios from "axios";

export const getRoomFeatures = async () => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "v1/room-features/all"
  );
  return data;
};
