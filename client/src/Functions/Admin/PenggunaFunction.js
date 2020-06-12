import axios from "axios";

// Create
export const createPengguna = (dataPengguna) => {
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

// Get All
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

// Get by ID
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

// Update
export const updatePengguna = (dataPengguna, id) => {
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

// Delete
export const deletePengguna = (id) => {
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