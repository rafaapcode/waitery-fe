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
    const dirtiedFields = this.getOnlyDirtiedFields(
      params.data,
      params.dirtiedFields
    );
    await this.client.patch(`/user/${params.id}`, dirtiedFields);
  }

  static async createUser(params: UsersService.CreateUserInput): Promise<void> {
    await this.client.post("/user", params);
  }

  private static getOnlyDirtiedFields<T>(
    obj: T,
    dirtiedFields: Partial<Record<keyof T, boolean>>
  ): Partial<T> {
    const result: Partial<T> = {};
    for (const key in dirtiedFields) {
      if (dirtiedFields[key]) {
        result[key] = obj[key];
      }
    }
    return result;
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
    dirtiedFields: Partial<
      Readonly<{
        name?: boolean | undefined;
        email?: boolean | undefined;
        password?: boolean | undefined;
        role?: boolean | undefined;
      }>
    >;
  };

  export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: UserRole;
  };
}
