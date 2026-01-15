import { useQueryClient } from "@tanstack/react-query";

export function useRevalidateOrg() {
  const queryClient = useQueryClient();

  const revalidateOrgs = () => {
    queryClient.invalidateQueries({ queryKey: ["orgs", "all"] });
  };

  return { revalidateOrgs };
}