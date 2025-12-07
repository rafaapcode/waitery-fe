import type { Ingredient } from "../../entities/Ingredients";
import { Service } from "../service";

export class IngredientService extends Service {
  static async getAllIngredients(): Promise<IngredientService.GetAllIngredientsOutput> {
    const { data }  = await this.client.get<IngredientService.GetAllIngredientsOutput>("/ingredients");
    return data;
  }

  static async createIngredients(data: IngredientService.CreateIngredientInput): Promise<void> {
    await this.client.post<void>("/ingredients", data);
  }
}


export namespace IngredientService {
  export type GetAllIngredientsOutput = Ingredient[];

  export type CreateIngredientInput = {
    name: string;
    icon: string;
  }
}

