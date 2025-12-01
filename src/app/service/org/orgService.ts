import type { Org } from "../../entities/Org";
import { Service } from "../service";

export class OrgService extends Service {
  static async getAllOrgs(): Promise<OrgService.GetAllOrgsOutput> {
    const { data } = await this.client.get<OrgService.GetAllOrgsOutput>(
      "/organization/all"
    );
    return data;
  }

  static async getOrg(): Promise<OrgService.GetOrgOutput> {
    const { data } = await this.client.get<OrgService.GetOrgOutput>(
      "/organization"
    );
    return data;
  }

  static async updateOrg(
    params: OrgService.UpdateOrgInput
  ): Promise<OrgService.UpdateOrgOutput> {
    const dirtyFields = this.getOnlyDirtiedFields(params.org, params.dirtiedFields);

    const { data } = await this.client.patch<OrgService.UpdateOrgOutput>(
      "/organization",
      dirtyFields
    );
    
    return {
      org: {
        cep: data.org.cep,
        description: data.org.description,
        email: data.org.email,
        location_code: data.org.location_code,
        name: data.org.name,
        close_hour: data.org.close_hour,
        open_hour: data.org.open_hour,
      }
    };
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

export namespace OrgService {
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
      image?: File | undefined;
      cep?: string;
      description?: string;
      email?: string;
      location_code?: string;
      name?: string;
      close_hour?: number;
      open_hour?: number;
    };
  };
}
