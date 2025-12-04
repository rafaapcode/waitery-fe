import { useState } from "react";
import { useTodayOrders } from "../../../app/hooks/queries/useTodayOrders";

export const useHomeController = () => {
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  const onCloseRestartModal = () => setIsRestartModalOpen(false);
  const onOpenRestartModal = () => setIsRestartModalOpen(true);

  const { orders } = useTodayOrders({});



  return {
    orders,
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
  };
};
