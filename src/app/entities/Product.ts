import type { Category } from "./Category";

export interface Product {
  id: string;
  org_id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  ingredients: {value: string; label: string;}[];
  category: Category;
  discounted_price: number;
  discount: boolean;
}