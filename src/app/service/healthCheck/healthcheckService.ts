import { Service } from "../service";

export class HealthCheckService extends Service {
  static async status() {
    await this.client.get<{status: string}>('/health');
  }
}