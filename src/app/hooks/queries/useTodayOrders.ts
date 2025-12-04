import { useQuery } from '@tanstack/react-query';
import { OrderService } from '../../service/order/orderService';

type UseTodayOrdersParams = {
  enabled?: boolean;
};

export function useTodayOrders({enabled}: UseTodayOrdersParams) {
  const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["orders","today",],
    queryFn: async () => {
      const orders = await OrderService.getAllOrdersOfToday();
      return orders;
    },
  });

  return { orders: data, isError, isFetching, isSuccess, loadOrders: refetch };
}