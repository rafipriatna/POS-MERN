import axios from "axios";

// Create
export const createKategoriBarang = (dataKategoriBarang) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post("/barang/kategori", dataKategoriBarang, {
      headers,
    })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

// Get All
export const getAllKategoriBarang = () => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get("/barang/kategori", {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
