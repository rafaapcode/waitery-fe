import type { Order } from "../../entities/Order";
import { Service } from "../service";

export class OrderService extends Service {
  static async getAllOrders(
    page: number = 0
  ): Promise<OrderService.GetAllOrderOutput> {
    const { data } = await this.client.get<OrderService.GetAllOrderOutput>(
      `/order/get-all/page/${page}`
    );
    return data;
  }

  static async deleteOrder(orderId: string): Promise<void> {
    await this.client.delete(
      `/order/delete/${orderId}`
    );
  }

  static async cancelOrder(orderId: string): Promise<void> {
    await this.client.patch(
      `/order/cancel/${orderId}`
    );
  }
}

export namespace OrderService {
  export type GetAllOrderOutput = {
    has_next: boolean;
    orders: Order[];
  };
}
