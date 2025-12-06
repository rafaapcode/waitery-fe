import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { OrderStatus, type Order } from "../../../app/entities/Order";
import { useRestartOrderMutation } from "../../../app/hooks/mutations/useOrderMutation";
import { useTodayOrders } from "../../../app/hooks/queries/useTodayOrders";
import { useAuth } from "../../../app/hooks/useAuth";

export const useHomeController = () => {
  const { user } = useAuth();
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [ordersWs, setOrdersWs] = useState<Order[]>([]);

  const onCloseRestartModal = () => setIsRestartModalOpen(false);
  const onOpenRestartModal = () => setIsRestartModalOpen(true);

  const { orders, isFetching } = useTodayOrders({});

  const waitingOrders: Order[] =
    ordersWs?.filter((order) => order.status === OrderStatus.WAITING) || [];

  const inProductionOrders: Order[] =
    ordersWs?.filter((order) => order.status === OrderStatus.IN_PRODUCTION) || [];

  const doneOrders: Order[] =
    ordersWs?.filter((order) => order.status === OrderStatus.DONE) || [];

  const restartOrdersMutation = useRestartOrderMutation({
    onClose: onCloseRestartModal,
  });

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    setOrdersWs(orders || []);

    socket.on(`order-org-${user?.org.id}`, (newOrder: {action: string; order: Order}) => {
      if(newOrder.action === 'new_order') {
        setOrdersWs((prevOrders) => [newOrder.order, ...prevOrders]);
      }
    });

    return () => {
      socket.disconnect();
      setOrdersWs([]);
    };
  }, [orders, user?.org.id, restartOrdersMutation.restartOrders]);

  return {
    orders: ordersWs,
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
    waitingOrders,
    inProductionOrders,
    doneOrders,
    restartOrdersMutation,
    isFetching
  };
};
