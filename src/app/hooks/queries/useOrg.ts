import { useQuery } from '@tanstack/react-query';
import { OrgService } from '../../service/org/orgService';

type UseOrgParams = {
  enabled?: boolean;
};

export function useOrg({enabled}: UseOrgParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["org"],
    queryFn: async () => {
      const { org } = await OrgService.getOrg();
      return org;
    },
  });

  return { org: data, isError, isFetching, isSuccess, loadOrg: refetch };
}