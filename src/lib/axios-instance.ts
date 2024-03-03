import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLI_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
