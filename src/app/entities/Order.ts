import { formatDate } from "../lib/formatDate";

export enum OrderStatus {
  WAITING = 'WAITING',
  IN_PRODUCTION = 'IN_PRODUCTION',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export type ProductsOrder = {
  image_url?: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  discount: boolean;
};

export type HistoryOrder = {
  id: string;
  org_id: string;
  status: OrderStatus;
  date: string;
  total: number;
  table: string;
  category: string;
  name: string;
  quantity: number;
  products: ProductsOrder[]; 
}

export interface Order {
  id: string;
  org_id: string;
  status: OrderStatus;
  deleted_at?: Date;
  created_at: Date;
  total_price: number;
  quantity: number;
  table: string;
  products: ProductsOrder[];
}

export const fromHistoryOrder = (historyOrder: HistoryOrder[] | HistoryOrder): Order[] | Order => {

  if (!Array.isArray(historyOrder)) {
    return {
      id: historyOrder.id,
      org_id: historyOrder.org_id,
      quantity: historyOrder.quantity,
      status: historyOrder.status,
      created_at: new Date(historyOrder.date),
      total_price: historyOrder.total,
      table: historyOrder.table,
      products: historyOrder.products,
    }
  }

  return historyOrder.map((order) => {
    return {
      id: order.id,
      org_id: order.org_id,
      quantity: order.quantity,
      status: order.status,
      created_at: new Date(order.date),
      total_price: order.total,
      table: order.table,
      products: order.products,
    }
  })
}

export const toHistoryOrder = (order: Order[]): HistoryOrder[] => {
  return order.map((order) => {
    return {
      id: order.id,
      org_id: order.org_id,
      quantity: order.quantity,
      status: order.status,
      date: formatDate(order.created_at),
      total: order.total_price,
      table: order.table,
      category: order.products[0]?.category || '',
      products: order.products,
      name: order.products.map((product) => product.name).join(', '),
    }
  })
}