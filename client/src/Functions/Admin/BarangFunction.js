import axios from "axios";

// Create
export const createBarang = (dataBarang) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .post("/barang", dataBarang, {
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

// Get By ID
export const getBarangById = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get(`/barang/${id}`, {
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
export const updateBarang = (dataBarang, id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .patch(`/barang/${id}`, dataBarang, {
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
export const deleteBarang = (id) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .delete(`/barang/${id}`, {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};