import axios from "axios";
import { localStorageKeys } from "../config/constants";
import { env } from "../config/env";

export const httpClient = axios.create({
  baseURL: env.VITE_API_URL
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    if(token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    };

    return config;
  },
);