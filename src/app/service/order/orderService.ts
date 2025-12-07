import type { Order, OrderStatus } from "../../entities/Order";
import { Service } from "../service";

export class OrderService extends Service {
  static async getAllOrders(
    page: number = 0
  ): Promise<OrderService.GetAllOrderOutput> {
    const { data } = await this.client.get<OrderService.GetAllOrderOutput>(
      `/orders/get-all/page/${page}`
    );
    return data;
  }

  static async getAllOrdersOfToday(): Promise<OrderService.GetAllOrdersOfTodayOutput> {
    const { data } =
      await this.client.get<OrderService.GetAllOrdersOfTodayOutput>(
        `/orders/get-all/today?canceled_orders=false`
      );
    return data;
  }

  static async updateOrderStatus(params: OrderService.UpdateOrdersStatusOutput): Promise<void> {
      await this.client.patch<void>(
        `/orders/${params.id}`,
        { status: params.status }
      );
  }

  static async deleteOrder(orderId: string): Promise<void> {
    await this.client.delete(`/orders/delete/${orderId}`);
  }

  static async cancelOrder(orderId: string): Promise<void> {
    await this.client.patch(`/orders/cancel/${orderId}`);
  }

  static async restartOrdersOfDay(): Promise<void> {
    await this.client.patch('/orders/restart');
  }
}

export namespace OrderService {
  export type GetAllOrderOutput = {
    has_next: boolean;
    orders: Order[];
  };

  export type GetAllOrdersOfTodayOutput = Order[];

  export type UpdateOrdersStatusOutput = {
    id: string;
    status: OrderStatus;
  };
}
