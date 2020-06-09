import axios from "axios";
import querystring from "querystring";

// Pengguna

export const getAllPengguna = () => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    Authorization: `Bearer ${data.token}`,
  };

  return axios
    .get("users", {
      headers,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return false;
    });
};

export const tambahPengguna = (dataPengguna) => {
  const data = JSON.parse(localStorage.getItem("userAuth"));
  if (data === null) return false;

  const headers = {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${data.token}`,
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
