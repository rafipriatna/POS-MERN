import axios from "axios";

// Start Pengguna Functions
export const tambahPengguna = (dataPengguna) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post("/users", dataPengguna, {
      headers,
    })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const getAllPengguna = () => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get("/users", {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPenggunaById = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get(`/users/${id}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

export const editPengguna = (dataPengguna, id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .patch(`/users/${id}`, dataPengguna, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

export const hapusPengguna = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .delete(`/users/${id}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
// End Pengguna Functions

// Start Barang Functions
export const createBarang = (dataBarang) => {};

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
