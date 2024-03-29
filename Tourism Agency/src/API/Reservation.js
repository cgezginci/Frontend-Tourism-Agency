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

export const updateReservationFunc = async (reservation) => {
  const data = await axios.put(
    "http://localhost:8080/v1/reservation",
    reservation
  );
  return data;
};

export const getReservationByPersonNameAndSurname = async (
  personName,
  personSurname
) => {
  const data = await axios.get(
    `http://localhost:8080/v1/reservation/filter/${personName}/${personSurname}`
  );
  return data;
};
