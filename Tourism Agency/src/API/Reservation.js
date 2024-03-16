import axios from "axios";

export const getReservation = async () => {
  const data = await axios.get("http://localhost:8080/v1/reservation/all");
  return data;
};

export const addReservation = async (reservation) => {
  const data = await axios.post(
    "http://localhost:8080/v1/reservation ",
    reservation
  );
  return data;
};

export const deleteReservation = async (id) => {
  const data = await axios.delete(`http://localhost:8080/v1/reservation/${id}`);
  return data;
};
