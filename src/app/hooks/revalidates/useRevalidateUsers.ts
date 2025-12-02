import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateUsers() {
  const queryClient = useQueryClient();

  const revalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: ["users", "all"] });
  };

  return { revalidateUsers };
}