import axios from "axios";

// Create
export const createPenjualan = (dataPenjualan) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post("/penjualan", dataPenjualan, {
      headers,
    })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return err;
    });
};