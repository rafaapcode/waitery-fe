import type { User, UserRole } from "../../entities/User";
import { Service } from "../service";

export class UsersService extends Service {
  static async getMe(): Promise<UsersService.GetMeResponse> {
    const { data } = await this.client.get<UsersService.GetMeResponse>(
      "/user/me"
    );
    return data;
  }

  static async updateMe(): Promise<UsersService.GetMeResponse> {
    const { data } = await this.client.get<UsersService.GetMeResponse>(
      "/user/me"
    );
    return data;
  }

  static async getAllUsers(
    page: UsersService.GetAllUsersInput = 0
  ): Promise<UsersService.GetAllUsersOutput> {
    const { data } = await this.client.get<UsersService.GetAllUsersOutput>(
      `/user/all?page=${page}`
    );
    return data;
  }

  static async deleteUser(userId: UsersService.DeleteUserInput): Promise<void> {
    await this.client.delete(`/user/${userId}`);
  }

  static async updateUser(params: UsersService.UpdateUserInput): Promise<void> {
    await this.client.patch(`/user/${params.id}`, params.data);
  }

  static async createUser(params: UsersService.CreateUserInput): Promise<void> {
    await this.client.post('/user', params);
  }
}

export namespace UsersService {
  export type GetMeResponse = {
    id: string;
    email: string;
    name: string;
    cpf: string;
  };

  export type GetAllUsersInput = number | undefined;
  export type GetAllUsersOutput = {
    users: User[];
    has_next: boolean;
  };

  export type DeleteUserInput = string;

  export type UpdateUserInput = {
    id: string;
    data: {
      name?: string;
      email?: string;
      password?: string;
      cpf?: string;
      role?: UserRole;
    };
  };

  export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: UserRole;
  };
}
