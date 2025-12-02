import type { Product } from "../../entities/Product";
import { Service } from "../service";

export class ProductService extends Service {
  static async getAllProducts(
    page: number = 0
  ): Promise<ProductService.GetAllProductsOutput> {
    const { data } = await this.client.get<ProductService.GetAllProductsOutput>(
      `/product/all/${page}`
    );
    return data;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { data } = await this.client.delete<void>(`/product/${id}`);
    return data;
  }

  static async updateProduct(
    data: ProductService.UpdateProductsInput
  ): Promise<void> {
    await this.client.put<void>(`/product/${data.id}`, data.data);
  }

  static async createProduct(
    data: ProductService.CreateProductsInput
  ): Promise<void> {
    await this.client.post<void>(`/product`, {...data, price: Number(data.price) } );
  }
}

export namespace ProductService {
  export type GetAllProductsOutput = {
    has_next: boolean;
    products: Product[];
  };

  export type UpdateProductsInput = {
    id: string;
    data: {
      name?: string;
      description?: string;
      price?: number;
      ingredients?: string[];
    };
  };

  export type CreateProductsInput = {
    name: string;
    description: string;
    price: string;
    category_id: string;
    ingredients: string[];
  };
}
