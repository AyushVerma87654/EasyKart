import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://easykartbackendbyayush.onrender.com"
  : "/api";

console.log("API_BASE_URL", API_BASE_URL);

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // for cookies/sessions
});

export default instance;
