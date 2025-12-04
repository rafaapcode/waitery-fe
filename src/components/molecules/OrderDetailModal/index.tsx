import { Activity } from "react";
import { OrderStatus, type Order } from "../../../app/entities/Order";
import { formatCurrency } from "../../../app/lib/formatCurrency";
import Button from "../../atoms/Button";

import { formatDate } from "../../../app/lib/formatDate";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../molecules/Modal";
import OrderItem from "./OrderItem";

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onUpdate?: (newStatus: OrderStatus) => void;
  columnName?: string;
  order: Order | null;
  variant?: "ORDER" | "HISTORY";
  isDeleting?: boolean;
  isUpdating?: boolean;
  isCanceling?: boolean;
}

function OrderDetailModal({
  open,
  onClose,
  order,
  columnName = "",
  variant = "ORDER",
  onDelete,
  onUpdate,
  onCancel,
  isDeleting,
  isUpdating,
  isCanceling
}: OrderDetailModalProps) {
  if (!order) {
    return null;
  }

  const nextStatus = order.status === OrderStatus.WAITING ? OrderStatus.IN_PRODUCTION : OrderStatus.DONE;

  const products = order.products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    image: product.image_url ?? "",
  }));

  const nextButtonTitle =
    columnName === "🕛 Fila de Espera"
      ? "Iniciar Preparação"
      : "Concluir Pedido";

  const isOrderVariant = variant === "ORDER";

  return (
    <Modal open={open}>
      <ModalHeader title={order.table} onClose={onClose} />
      <ModalContent>
        <div className="w-full flex flex-col gap-8 min-w-[416px] max-w-[480px]">
          <div className="space-y-2">
            {isOrderVariant ? (
              <>
                <p className="text-sm text-gray-500">Status do Pedido</p>
                <span className="font-bold">{columnName}</span>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">Data do Pedido</p>
                <span className="font-bold text-gray-600">
                  {formatDate(order.created_at)}
                </span>
              </>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Itens</p>
            <div className="space-y-4 overflow-y-auto max-h-[270px]">
              {products.map((order) => (
                <OrderItem order={order} key={order.name}/>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm text-gray-500">Total</p>
            <span className="font-bold">
              {formatCurrency(order.total_price)}
            </span>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>

        <Activity
          mode={
            columnName !== "✅ Pronto" && isOrderVariant ? "visible" : "hidden"
          }
        >
          <div className="w-full flex  justify-between items-center">
            <Button isLoading={isCanceling} variant="secondary" onClick={onCancel}>
              Cancelar Pedido
            </Button>
            <Button isLoading={isUpdating} onClick={() => onUpdate && onUpdate(nextStatus)}>{nextButtonTitle}</Button>
          </div>
        </Activity>

        <Activity mode={isOrderVariant ? "hidden" : "visible"}>
          <Button isLoading={isDeleting} variant="secondary" onClick={onDelete}>
            Excluir Registro
          </Button>
        </Activity>

      </ModalFooter>
    </Modal>
  );
}

export default OrderDetailModal;
