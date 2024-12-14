import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://badjanani2back-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
