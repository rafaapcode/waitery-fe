import axios from "axios";
import { env } from "../config/env";

export abstract class Service {
  protected static client = axios.create({
    baseURL: env.VITE_API_URL,
  });

  static setAccessToken(token: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  static setRemoveToken() {
    this.client.defaults.headers.common.Authorization = undefined;
  }
}

