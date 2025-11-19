import type { Org } from "../../entities/Org";
import { Service } from "../service";

export class OrgService extends Service {
  static async getAllOrgs(): Promise<OrgService.GetAllOrgsOutput> { 
    const { data } = await this.client.get<OrgService.GetAllOrgsOutput>("/organization/all");
    return data;
  }

  static async getOrg(): Promise<OrgService.GetOrgOutput> { 
    const { data } = await this.client.get<OrgService.GetOrgOutput>("/organization");
    return data;
  }
}


export namespace OrgService {
  export type GetAllOrgsOutput = {
    orgs: Org[];
  };

  export type GetOrgOutput = {
    org: Org;
  };
}
