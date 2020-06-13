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

// Get by ID
export const getKategoriBarangById = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get(`/barang/kategori/${id}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

// Update
export const updateKategoriBarang = (dataKategoriBarang, id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .patch(`/barang/kategori/${id}`, dataKategoriBarang, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

// Delete
export const deleteKategoriBarang = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .delete(`/barang/kategori/${id}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
