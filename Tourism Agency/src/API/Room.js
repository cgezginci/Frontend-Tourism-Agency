import axios from "axios";

export const getRooms = async () => {
  const data = await axios.get("http://localhost:8080/v1/room/all");
  return data;
};

export const addRoom = async (room) => {
  const data = await axios.post("http://localhost:8080/v1/room ", room);
  return data;
};

export const deleteRoom = async (id) => {
  const data = await axios.delete(`http://localhost:8080/v1/room/${id}`);
  return data;
};

export const updateRoomFunc = async (room) => {
  const data = await axios.put("http://localhost:8080/v1/room", room);
  return data;
};

export const getRoomByDates = async (startDate, endDate) => {
  const data = await axios.get(
    `http://localhost:8080/v1/room/date?startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

export const getRoomByHotelName = async (hotelName) => {
  const data = await axios.get(
    `http://localhost:8080/v1/room/filter/${hotelName}`
  );
  return data;
};
