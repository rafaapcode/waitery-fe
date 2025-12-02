import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateIngredients() {
  const queryClient = useQueryClient();

  const revalidateIngredients = () => {
    queryClient.invalidateQueries({ queryKey: ["ingredients", "all"] });
  };

  return { revalidateIngredients };
}