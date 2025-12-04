import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateOrders() {
  const queryClient = useQueryClient();

  const revalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey: ["orders", "all"] });
  };

  return { revalidateOrders };
}

export function useRevalidateTodayOrders() {
  const queryClient = useQueryClient();

  const revalidateOrders = () => {
    queryClient.invalidateQueries({ queryKey:  ["orders","today",] });
  };

  return { revalidateOrders };
}