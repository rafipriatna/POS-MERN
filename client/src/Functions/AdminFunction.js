import axios from "axios";

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
