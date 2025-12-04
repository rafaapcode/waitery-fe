import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { OrderStatus, type Order } from "../../../app/entities/Order";
import { useRestartOrderMutation } from "../../../app/hooks/mutations/useOrderMutation";
import { useTodayOrders } from "../../../app/hooks/queries/useTodayOrders";
import { useAuth } from "../../../app/hooks/useAuth";

export const useHomeController = () => {
  const { user } = useAuth();
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  const onCloseRestartModal = () => setIsRestartModalOpen(false);
  const onOpenRestartModal = () => setIsRestartModalOpen(true);

  const { orders } = useTodayOrders({});

  const waitingOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.WAITING) || [];

  const inProductionOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.IN_PRODUCTION) || [];

  const doneOrders: Order[] =
    orders?.filter((order) => order.status === OrderStatus.DONE) || [];

  const restartOrdersMutation = useRestartOrderMutation({
    onClose: onCloseRestartModal,
  });

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on(`order-org-${user?.org.id}`, (newOrder: Order) => {
      console.log("New order received via socket:", newOrder);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    orders,
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
    waitingOrders,
    inProductionOrders,
    doneOrders,
    restartOrdersMutation,
  };
};
