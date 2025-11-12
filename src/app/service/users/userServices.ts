import { client } from "../client";

export class UsersService  {
  static async getMe() {
    const info = await client.get<UsersService.GetMeResponse>("/user/me");
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
