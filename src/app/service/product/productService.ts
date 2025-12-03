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
    const dirtiesFieds = this.getOnlyDirtiedFields(
      data.data,
      data.dirtiesFieds
    );
    await this.client.put<void>(`/product/${data.id}`, {
      ...dirtiesFieds,
      ingredients: data.data.ingredients,
    });
  }

  static async createProduct(
    data: ProductService.CreateProductsInput
  ): Promise<void> {
    await this.client.post<void>(`/product`, {
      ...data,
      price: Number(data.price),
    });
  }

  private static getOnlyDirtiedFields<T>(
    obj: T,
    dirtiedFields: Partial<Record<keyof T, boolean>>
  ): Partial<T> {
    const result: Partial<T> = {};
    for (const key in dirtiedFields) {
      if (dirtiedFields[key]) {
        result[key] = obj[key];
      }
    }
    return result;
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
    dirtiesFieds: Partial<
      Readonly<{
        name?: boolean | undefined;
        description?: boolean | undefined;
        price?: boolean | undefined;
        category?: boolean | undefined;
      }>
    >;
  };

  export type CreateProductsInput = {
    name: string;
    description: string;
    price: string;
    category_id: string;
    ingredients: string[];
  };
}
