import { localStorageKeys } from "../config/constants";
import type { UserDataContext } from "../context/AuthContext";

export class StorageManager {
  static saveToken(token: string) {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token);
  }

  static saveUser(user: UserDataContext) {
    localStorage.setItem(localStorageKeys.STORAGE_USER, JSON.stringify(user));
  }

  static loadUser(): UserDataContext | undefined{
    try {
      const json = localStorage.getItem(localStorageKeys.STORAGE_USER);
      return json ? JSON.parse(json) as UserDataContext : undefined;
    } catch {
      return undefined;
    }
  }

  static loadToken(): string | null{
    try {
      const json = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
      return json ? json : null;
    } catch {
      return null;
    }
  }

  static clearStorage() {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.STORAGE_USER);
  }
}