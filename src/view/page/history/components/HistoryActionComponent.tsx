import { EyeIcon, Trash } from "lucide-react";
import type { Order } from "../../../../app/entities/Order";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";
import OrderDetailModal from "../../../../components/molecules/OrderDetailModal";
import { useHistoryController } from "../useHistoryController";

interface HistoryActionComponentProps {
  order?: Order;
}

function HistoryActionComponent({ order }: HistoryActionComponentProps) {
  const {
    isOpenViewerModal,
    setIsOpenViewerModal,
    isOpenConfirmModal,
    setIsOpenConfirmModal,
    onCloseViewerModal,
    onCloseconfirmModal,
    deleteOrderMutationConfirmModal,
    deleteOrderMutationViewerModal
  } = useHistoryController(order?.id ?? "");

  return (
    <div className="flex gap-1.5 items-center justify-end">
      {order && (
        <OrderDetailModal isDeleting={deleteOrderMutationViewerModal.isPending} open={isOpenViewerModal} onClose={onCloseViewerModal} order={order} variant="HISTORY" onDelete={deleteOrderMutationViewerModal.deleteOrder}/>
      )}
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir pedido"
        description={`Tem certeza que deseja excluir o pedido da mesa ${order?.table} ?  Esta ação não pode ser desfeita.`}
        onConfirm={deleteOrderMutationConfirmModal.deleteOrder}
        onCancel={onCloseconfirmModal}
        isLoading={deleteOrderMutationConfirmModal.isPending}
      />
      <Button
        onClick={() => setIsOpenViewerModal(true)}
        size="icon"
        variant="secondary"
        className="text-gray-500 hover:text-gray-400"
      >
        <EyeIcon size={18} />
      </Button>
      <Button
        onClick={() => setIsOpenConfirmModal(true)}
        size="icon"
        variant="secondary"
        className="text-red-700 hover:text-red-600"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
}

export default HistoryActionComponent;
