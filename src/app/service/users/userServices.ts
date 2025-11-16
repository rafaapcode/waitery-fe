import { Service } from "../service";

export class UsersService extends Service {
  static async getMe() {
    const info = await this.client.get<UsersService.GetMeResponse>("/user/me");
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
