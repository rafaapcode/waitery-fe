import { client } from "../client";

export class HealthCheckService {
  static async status() {
    await client.get<{status: string}>('/health');
  }
}