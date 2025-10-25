import axios from "axios";
import store from "../redux/store";
import {
  logoutInitiatedAction,
  updateAccessTokenAction,
} from "../redux/slice/userSlice";

const baseURL = "https://easykartbackendbyayush.onrender.com";
// const baseURL = "http://localhost:8888";

const instance = axios.create({ baseURL });

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

instance.interceptors.response.use(
  async (response) => {
    const originalRequest = response.config;
    if (response.data.message === "Token Expired") {
      try {
        const { data } = await axios.get(baseURL + "/me", {
          withCredentials: true,
        });
        store.dispatch(
          updateAccessTokenAction(data.responseDetails.accessToken)
        );
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = `Bearer ${data.responseDetails.accessToken}`;
        const retryConfig = {
          ...originalRequest,
          data:
            typeof originalRequest.data === "string"
              ? JSON.parse(originalRequest.data)
              : originalRequest.data,
        };
        return instance(retryConfig);
      } catch (err) {
        store.dispatch(logoutInitiatedAction());
        return Promise.reject(err);
      }
    }
    return response;
  },
  async (error) => Promise.reject(error)
);

export default instance;
