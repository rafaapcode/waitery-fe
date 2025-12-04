import { useState } from "react";
import { OrderStatus, type Order } from "../../../app/entities/Order";
import { useRestartOrderMutation } from "../../../app/hooks/mutations/useOrderMutation";
import { useTodayOrders } from "../../../app/hooks/queries/useTodayOrders";

export const useHomeController = () => {
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
