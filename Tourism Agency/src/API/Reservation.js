import axios from "axios";

export const getReservation = async () => {
  const data = await axios.get(import.meta.env.VITE_APP_BASE_URL + "v1/reservation/all");
  return data;
};

export const addReservation = async (reservation) => {
  const data = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "v1/reservation ",
    reservation
  );
  return data;
};

export const deleteReservation = async (id) => {
  const data = await axios.delete(import.meta.env.VITE_APP_BASE_URL + `v1/reservation/${id}`);
  return data;
};

export const updateReservationFunc = async (reservation) => {
  const data = await axios.put(
    import.meta.env.VITE_APP_BASE_URL + "v1/reservation",
    reservation
  );
  return data;
};

export const getReservationByPersonNameAndSurname = async (
  personName,
  personSurname
) => {
  const data = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + `v1/reservation/filter/${personName}/${personSurname}`
  );
  return data;
};
