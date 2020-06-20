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

// Get By Kode Penjualan
export const getPenjualanByKodePenjualan = (KodePenjualan) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get(`/penjualan/${KodePenjualan}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

// Update Jumlah Barang
export const updateJumlahBarangPenjualan = (dataUpdatePenjualan, id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .patch(`/penjualan/${id}`, dataUpdatePenjualan, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
