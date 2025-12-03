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
  console.log('historyOrder', historyOrder);
  if (!Array.isArray(historyOrder)) {
    const formattedDate = historyOrder.date.split('/');
    const day = Number(formattedDate[0]);
    const month = Number(formattedDate[1]) - 1;
    const year = Number(formattedDate[2]) + 2000;
    return {
      id: historyOrder.id,
      org_id: historyOrder.org_id,
      quantity: historyOrder.quantity,
      status: historyOrder.status,
      created_at: new Date(year, month, day),
      total_price: historyOrder.total,
      table: historyOrder.table,
      products: historyOrder.products,
    }
  }
  console.log('historyOrder', historyOrder);
  return historyOrder.map((order) => {
    const formattedDate = order.date.split('/');
    const day = Number(formattedDate[0]);
    const month = Number(formattedDate[1]) - 1;
    const year = Number(formattedDate[2]) + 2000;
    return {
      id: order.id,
      org_id: order.org_id,
      quantity: order.quantity,
      status: order.status,
      created_at: new Date(year, month, day),
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
      date: formatDate(new Date(order.created_at)),
      total: order.total_price,
      table: order.table,
      category: order.products[0]?.category || '',
      products: order.products,
      name: order.products.map((product) => product.name).join(', '),
    }
  })
}