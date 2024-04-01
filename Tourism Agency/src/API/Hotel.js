import axios from "axios";

export const getHotels = async () => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "v1/hotel/all"
  );
  return data;
};

export const addHotel = async (hotel) => {
  const data = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "v1/hotel",
    hotel
  );
  return data;
};

export const deleteHotel = async (id) => {
  const data = await axios.delete(
    import.meta.env.VITE_APP_BASE_URL + `v1/hotel/${id}`
  );
  return data;
};

export const updateHotelFunc = async (hotel) => {
  const data = await axios.put(
    import.meta.env.VITE_APP_BASE_URL + "v1/hotel",
    hotel
  );
  return data;
};

export const getHotelByName = async (name) => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + `v1/hotel/${name}`
  );
  return data;
};
