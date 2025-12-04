import { useState } from "react";
import { useDeleteOrderMutation } from "../../../app/hooks/mutations/useOrderMutation";
import { useRevalidateOrders } from "../../../app/hooks/revalidates/useRevalidateOrders";

export function useHistoryController(orderId: string) {
    const [isOpenViewerModal, setIsOpenViewerModal] = useState(false);
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  
    const onCloseViewerModal = () => setIsOpenViewerModal(false);
    const onCloseconfirmModal = () => setIsOpenConfirmModal(false);
  
    const { revalidateOrders } = useRevalidateOrders();
  
    const deleteOrderMutationConfirmModal = useDeleteOrderMutation({ id: orderId ?? "", onClose: onCloseconfirmModal, revalidate: revalidateOrders });
  
    const deleteOrderMutationViewerModal = useDeleteOrderMutation({ id: orderId ?? "", onClose: onCloseViewerModal, revalidate: revalidateOrders });

    return {
      isOpenViewerModal,
      setIsOpenViewerModal,
      isOpenConfirmModal,
      setIsOpenConfirmModal,
      onCloseViewerModal,
      onCloseconfirmModal,
      deleteOrderMutationConfirmModal,
      deleteOrderMutationViewerModal
    }
}