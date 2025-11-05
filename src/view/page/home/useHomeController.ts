import { useState } from "react";

export const useHomeController = () => {
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

  const onCloseRestartModal = () => setIsRestartModalOpen(false);
  const onOpenRestartModal = () => setIsRestartModalOpen(true);

  return {
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
  };
};
