import { useQuery } from '@tanstack/react-query';
import { OrgService } from '../../service/org/orgService';

type UseOrgsParams = {
  enabled?: boolean;
};

export function useOrgs({enabled}: UseOrgsParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["orgs", "all"],
    queryFn: async () => {
      const { orgs } = await OrgService.getAllOrgs();
      return orgs;
    },
  });

  return { orgs: data, isError, isFetching, isSuccess, loadOrgs: refetch };
}