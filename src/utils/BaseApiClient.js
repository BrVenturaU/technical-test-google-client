import axios from "axios";
import store from "@/store";

export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status)
    ) {
      store.dispatch("user/logout");
    }
    return Promise.reject(error);
  }
);
