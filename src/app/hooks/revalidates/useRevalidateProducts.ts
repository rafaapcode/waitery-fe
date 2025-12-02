import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateProducts() {
  const queryClient = useQueryClient();

  const revalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey: ["products", "all"] });
  };

  return { revalidateProducts };
}
