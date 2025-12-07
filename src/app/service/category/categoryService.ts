import type { Category } from "../../entities/Category";
import { Service } from "../service";

export class CategoryService extends Service {
  static async getAllCategories(): Promise<CategoryService.GetAllCategoriesOutput> {
    const { data } = await this.client.get<CategoryService.GetAllCategoriesOutput>(
      "/categories/all"
    );
    return data;
  }

  static async getCategory(categoryId: string): Promise<CategoryService.GetCategoryOutput> {
    const { data } = await this.client.get<CategoryService.GetCategoryOutput>(
      `/categories/${categoryId}`
    );
    return data;
  }

  static async deleteCategory(categoryId: string): Promise<void> {
    await this.client.delete<void>(
      `/categories/${categoryId}`
    );
  }

   static async editCategory(categoryId: string, data: CategoryService.EditCategoryInput): Promise<Category> {
    const { data: updatedCategory } = await this.client.patch<Category>(
      `/categories/${categoryId}`,
      data
    );
    return updatedCategory;
  }

  static async createCategory(data: CategoryService.CreateCategoryInput): Promise<Category> {
    const { data: newCategory } = await this.client.post<Category>(
      `/categories`,
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