import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../../service/users/userServices';

type UseUsersParams = {
  enabled?: boolean;
};

export function useUsers({enabled}: UseUsersParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["users", "all"],
    queryFn: async () => {
      const data = await UsersService.getAllUsers();
      return data;
    },
  });

  return { users: data, isError, isFetching, isSuccess, loadUsers: refetch };
}