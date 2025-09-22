import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://easykartbackendbyayush.onrender.com"
  : "/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default instance;
