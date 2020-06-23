import axios from "axios";

// Create
export const createTransaksi = (dataTransaksi) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post("/transaksi", dataTransaksi, {
      headers,
    })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return err;
    });
};
