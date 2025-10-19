import type { User } from "../../entities/User";
import { httpClient } from "../httpClient";

export class LoginService {
  static async loginUser(
    data: LoginService.LoginInput
  ): Promise<LoginService.LoginOutput> {
    const { data: res } = await httpClient.post<LoginService.LoginOutput>(
      "/auth/signin",
      data
    );
    return res;
  }

  static async registerUser(
    data: LoginService.RegisterInput
  ): Promise<LoginService.RegisterOutput> {
    const { data: res } = await httpClient.post<LoginService.RegisterOutput>(
      "/auth/signup",
      data
    );
    return res;
  }
}

export namespace LoginService {
  export type LoginInput = { email: string; password: string };

  export type LoginOutput = User & {
    access_token: string;
    refresh_token: string;
  };

  export type RegisterInput = { name: string, email: string; password: string };

  export type RegisterOutput = User & {
    access_token: string;
    refresh_token: string;
  };
}
