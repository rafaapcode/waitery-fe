import { useQuery } from '@tanstack/react-query';
import { OrderService } from '../../service/order/orderService';

type UseOrdersParams = {
  enabled?: boolean;
};

export function useOrders({enabled}: UseOrdersParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["orders", "all"],
    queryFn: async () => {
      const orders = await OrderService.getAllOrders();
      return orders;
    },
  });

  return { orders: data, isError, isFetching, isSuccess, loadOrders: refetch };
}