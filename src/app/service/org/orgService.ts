import type { Org } from "../../entities/Org";
import { Service } from "../service";

export class OrgService extends Service {
  static async getAllOrgs(): Promise<OrgService.GetAllOrgsOutput> { 
    const { data } = await this.client.get<OrgService.GetAllOrgsOutput>("/organization/all");
    return data;
  }
}


export namespace OrgService {
  export type GetAllOrgsOutput = {
    orgs: Org[];
  };
}
