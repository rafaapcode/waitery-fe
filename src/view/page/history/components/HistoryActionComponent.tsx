import { useMutation } from "@tanstack/react-query";
import { EyeIcon, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Order } from "../../../../app/entities/Order";
import { useRevalidateOrders } from "../../../../app/hooks/revalidates/useRevalidateOrders";
import { OrderService } from "../../../../app/service/order/orderService";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";
import OrderDetailModal from "../../../../components/molecules/OrderDetailModal";

interface HistoryActionComponentProps {
  order?: Order;
}

function HistoryActionComponent({ order }: HistoryActionComponentProps) {
  const [isOpenViewerModal, setIsOpenViewerModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseViewerModal = () => setIsOpenViewerModal(false);
  const onCloseconfirmModal = () => setIsOpenConfirmModal(false);

  const { revalidateOrders } = useRevalidateOrders();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => OrderService.deleteOrder(order?.id || ""),
    onSuccess: () => {
      revalidateOrders();
      onCloseconfirmModal();
      toast.success("Pedido excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir pedido");
    },
  });

  return (
    <div className="flex gap-1.5 items-center justify-end">
      {order && (
        <OrderDetailModal open={isOpenViewerModal} onClose={onCloseViewerModal} order={order} variant="HISTORY" onDelete={() => {}}/>
      )}
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir pedido"
        description={`Tem certeza que deseja excluir o pedido da mesa ${order?.table} ?  Esta ação não pode ser desfeita.`}
        onConfirm={() => mutateAsync()}
        onCancel={onCloseconfirmModal}
        isLoading={isPending}
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
