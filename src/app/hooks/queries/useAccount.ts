import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../../service/users/userServices';
export function useAccount({enabled}: {enabled?: boolean}) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["users", "me"],
    queryFn: async () => {
      return await UsersService.getMe();
    },
    staleTime: Infinity,
  });

  return { account: data, isError, isFetching, isSuccess, loadAccount: refetch };
}