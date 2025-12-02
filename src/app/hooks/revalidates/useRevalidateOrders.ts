import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateOrders() {
  const queryClient = useQueryClient();

  const revalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey: ["orders", "all"] });
  };

  return { revalidateOrders };
}