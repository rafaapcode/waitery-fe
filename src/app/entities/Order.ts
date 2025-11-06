
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