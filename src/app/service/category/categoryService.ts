import type { Category } from "../../entities/Category";
import { Service } from "../service";

export class CategoryService extends Service {
  static async getAllCategories(): Promise<CategoryService.GetAllCategoriesOutput> {
    const { data } = await this.client.get<CategoryService.GetAllCategoriesOutput>(
      "/category/all"
    );
    return data;
  }

  static async getCategory(categoryId: string): Promise<CategoryService.GetCategoryOutput> {
    const { data } = await this.client.get<CategoryService.GetCategoryOutput>(
      `/category/${categoryId}`
    );
    return data;
  }

  static async deleteCategory(categoryId: string): Promise<void> {
    await this.client.delete<void>(
      `/category/${categoryId}`
    );
  }

   static async editCategory(categoryId: string, data: CategoryService.EditCategoryInput): Promise<Category> {
    const { data: updatedCategory } = await this.client.patch<Category>(
      `/category/${categoryId}`,
      data
    );
    return updatedCategory;
  }

  static async createCategory(data: CategoryService.CreateCategoryInput): Promise<Category> {
    const { data: newCategory } = await this.client.post<Category>(
      `/category`,
      data
    );
    return newCategory;
  }
}

export namespace CategoryService {
  export type GetAllCategoriesOutput = Category[];
  export type GetCategoryOutput = Category;

  export type EditCategoryInput = {
    name?: string;
    icon?: string;
  }

  export type CreateCategoryInput = {
    name: string;
    icon: string;
  }
}