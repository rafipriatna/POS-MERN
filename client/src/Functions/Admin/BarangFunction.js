import axios from "axios";

// Create
export const createBarang = (dataBarang) => {};

// Get All
export const getAllBarang = () => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get("/barang", {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};