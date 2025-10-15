import axios from "axios";
import store from "../redux/store";

const API_BASE_URL = import.meta.env.PROD
  ? "https://easykartbackendbyayush.onrender.com"
  : "/api";

const instance = axios.create({
  baseURL: "https://easykartbackendbyayush.onrender.com",
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.accessToken;

    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
