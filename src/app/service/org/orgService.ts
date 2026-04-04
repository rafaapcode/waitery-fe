import type { Org } from "../../entities/Org";
import { Service } from "../service";

export class OrgService extends Service {
  static async getAllOrgs(): Promise<OrgService.GetAllOrgsOutput> {
    const { data } =
      await this.client.get<OrgService.GetAllOrgsOutput>("/organizations/all");
    return data;
  }

  static async getOrg(): Promise<OrgService.GetOrgOutput> {
    const { data } =
      await this.client.get<OrgService.GetOrgOutput>("/organizations");
    return data;
  }

  static async updateOrg(
    params: OrgService.UpdateOrgInput,
  ): Promise<OrgService.UpdateOrgOutput> {
    const dirtyFields = this.getOnlyDirtiedFields(
      params.org,
      params.dirtiedFields,
    );

    const { data } = await this.client.patchForm<OrgService.UpdateOrgOutput>(
      "/organizations",
      dirtyFields,
    );

    return data;
  }

  static async createOrg(org: OrgService.CreateOrgParams): Promise<void> {
    await this.client.postForm("/organizations", {
      ...org,
      cep: org.cep.replace(/\D/g, ""),
    });
  }

  private static getOnlyDirtiedFields<T>(
    obj: T,
    dirtiedFields: Partial<Record<keyof T, boolean>>,
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

export namespace OrgService {
  export type CreateOrgParams = {
    image?: File | undefined;
    name: string;
    email: string;
    description: string;
    location_code: string;
    open_hour: number;
    close_hour: number;
    cep: string;
  };

  export type CreateOrgOutput = {
    orgs: Org;
  };

  export type GetAllOrgsOutput = {
    orgs: Org[];
  };

  export type GetOrgOutput = {
    org: Org;
  };

  export type UpdateOrgInput = {
    org: {
      image?: File | undefined;
      cep?: string;
      description?: string;
      email?: string;
      location_code?: string;
      name?: string;
      close_hour?: number;
      open_hour?: number;
    };
    dirtiedFields: Partial<
      Readonly<{
        image?: boolean | undefined;
        name?: boolean | undefined;
        email?: boolean | undefined;
        description?: boolean | undefined;
        location_code?: boolean | undefined;
        cep?: boolean | undefined;
        open_hour?: boolean | undefined;
        close_hour?: boolean | undefined;
      }>
    >;
  };

  export type UpdateOrgOutput = {
    org: {
      cep: string;
      city: string;
      close_hour: number;
      description: string;
      email: string;
      id: string;
      image_url: string;
      lat: number;
      location_code: string;
      long: number;
      name: string;
      neighborhood: string;
      open_hour: number;
      street: string;
    };
  };
}
