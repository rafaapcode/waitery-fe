import type { Order, OrderStatus } from "../../entities/Order";
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

  static async getAllOrdersOfToday(): Promise<OrderService.GetAllOrdersOfTodayOutput> {
    const { data } =
      await this.client.get<OrderService.GetAllOrdersOfTodayOutput>(
        `/order/get-all/today?canceled_orders=false`
      );
    return data;
  }

  static async updateOrderStatus(params: OrderService.UpdateOrdersStatusOutput): Promise<void> {
      await this.client.patch<void>(
        `/order/${params.id}`,
        { status: params.status }
      );
  }

  static async deleteOrder(orderId: string): Promise<void> {
    await this.client.delete(`/order/delete/${orderId}`);
  }

  static async cancelOrder(orderId: string): Promise<void> {
    await this.client.patch(`/order/cancel/${orderId}`);
  }

  static async restartOrdersOfDay(): Promise<void> {
    await this.client.patch('/order/restart');
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
