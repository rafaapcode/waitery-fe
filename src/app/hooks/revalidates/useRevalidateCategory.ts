import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateCategory() {
  const queryClient = useQueryClient();

  const revalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: ["categories", "all"] });
  };

  return { revalidateCategories };
}