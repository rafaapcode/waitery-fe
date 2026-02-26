import type { Product } from "../../entities/Product";
import { Service } from "../service";

export class ProductService extends Service {
  static async getAllProducts(
    page: number = 0,
  ): Promise<ProductService.GetAllProductsOutput> {
    const { data } = await this.client.get<ProductService.GetAllProductsOutput>(
      `/products/all/${page}`,
    );
    return data;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { data } = await this.client.delete<void>(`/products/${id}`);
    return data;
  }

  static async updateProduct(
    data: ProductService.UpdateProductsInput,
  ): Promise<void> {
    const dirtiesFieds = this.getOnlyDirtiedFields(
      data.data,
      data.dirtiesFieds,
    );

    await this.client.putForm<void>(`/products/${data.id}`, {
      ...dirtiesFieds,
      ingredients: data.data.ingredients,
      price: Number(data.data.price),
    });
  }

  static async createProduct(
    data: ProductService.CreateProductsInput,
  ): Promise<void> {
    await this.client.postForm<void>(`/products`, {
      ...data,
      price: Number(data.price),
    });
  }

  static async addDiscountToProduct(
    data: ProductService.AddDiscountInput,
  ): Promise<void> {
    await this.client.patch(`/products/discount/add/${data.id}`, {
      discounted_price: Number(data.discounted_price),
    });
  }

  private static getOnlyDirtiedFields<T>(
    obj: T,
    dirtiedFields: Partial<Record<keyof T, boolean>>,
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
      image?: File;
      name?: string;
      description?: string;
      price?: string;
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
    image?: File;
    name: string;
    description: string;
    price: string;
    category_id: string;
    ingredients: string[];
  };

  export type AddDiscountInput = {
    id: string;
    discounted_price: number;
  };
}
