import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { env } from "../../../app/config/env";
import { OrderStatus, type Order } from "../../../app/entities/Order";
import { useRestartOrderMutation } from "../../../app/hooks/mutations/useOrderMutation";
import { useTodayOrders } from "../../../app/hooks/queries/useTodayOrders";
import { useAuth } from "../../../app/hooks/useAuth";

export const useHomeController = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  const onCloseRestartModal = () => setIsRestartModalOpen(false);
  const onOpenRestartModal = () => setIsRestartModalOpen(true);

  const { orders = [], isFetching } = useTodayOrders({});

  const waitingOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.WAITING) || [];

  const inProductionOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.IN_PRODUCTION) ||
    [];

  const doneOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.DONE) || [];

  const restartOrdersMutation = useRestartOrderMutation({
    onClose: onCloseRestartModal,
  });

  const setOrders = (updater: Order[] | ((prev: Order[]) => Order[])) => {
    queryClient.setQueryData<Order[]>(["orders", "today"], (prev) => {
      const current = prev || [];
      if (typeof updater === "function") {
        return updater(current);
      }
      return updater;
    });
  };

  useEffect(() => {
    if (!user?.org.id) return;

    const socket = socketIo(env.VITE_API_URL, {
      transports: ["websocket"],
    });

    socket.on(
      `order-org-${user.org.id}`,
      (newOrder: { action: string; order: Order }) => {
        if (newOrder.action === "new_order") {
          queryClient.setQueryData<Order[]>(["orders", "today"], (prevOrders) => {
            if (!prevOrders) return [newOrder.order];
            if (prevOrders.some((o) => o.id === newOrder.order.id)) return prevOrders;
            return [newOrder.order, ...prevOrders];
          });
        }
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [user?.org.id, queryClient]);

  return {
    orders,
    setOrders,
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
    waitingOrders,
    inProductionOrders,
    doneOrders,
    restartOrdersMutation,
    isFetching,
  };
};
