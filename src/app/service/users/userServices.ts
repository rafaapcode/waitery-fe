import { httpClient } from "../httpClient";

export class UsersService {
  static async getMe() {
    const info = await httpClient.get<UsersService.GetMeResponse>("/user/me");
    return info.data as UsersService.GetMeResponse;
  }
}

export namespace UsersService {
  export type GetMeResponse = {
    id: string;
    email: string;
    name: string;
    cpf: string;
  }
}
