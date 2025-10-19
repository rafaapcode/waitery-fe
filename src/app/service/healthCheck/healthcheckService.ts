import { httpClient } from "../httpClient";

export class HealthCheckService {
  static async status() {
    await httpClient.get<{status: string}>('/health');
  }
}