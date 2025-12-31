// src/api/servicesApi.js
import axios from "axios";

export const fetchServices = async () => {
  const token = sessionStorage.getItem("token"); // 👈 your stored token

  const res = await axios.get(
    "https://dev.backend.fixonn.in/api/v1/service/list",
    {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 pass token
      },
    }
  );

  return res.data.data;
};
