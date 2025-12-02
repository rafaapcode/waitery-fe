import { useQuery } from '@tanstack/react-query';
import { IngredientService } from '../../service/ingredient/ingredientService';

type UseIngredientsParams = {
  enabled?: boolean;
};

export function useIngredients({enabled}: UseIngredientsParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["ingredients", "all"],
    queryFn: async () => {
      const ingredients = await IngredientService.getAllIngredients();
      return ingredients;
    },
  });

  return { ingredients: data, isError, isFetching, isSuccess, loadIngredients: refetch };
}