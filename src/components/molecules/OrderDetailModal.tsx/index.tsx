import type { Order } from "../../../app/entities/Order";
import { formatCurrency } from "../../../app/lib/formatCurrency";

import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../molecules/Modal";
import OrderItem from "./OrderItem";

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  columnName: string;
  order: Order | null;
}

function OrderDetailModal({
  open,
  onClose,
  order,
  columnName,
}: OrderDetailModalProps) {
  if (!order) {
    return null;
  }

  const products = order.products.map((product) => ({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    image: product.image_url ?? "",
  }));

  const prod = products[0];

  return (
    <Modal open={open}>
      <ModalHeader title={order.table} onClose={onClose} />
      <ModalContent>
        <div className="w-full flex flex-col gap-8 min-w-[416px] max-w-[480px]">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status do Pedido</p>
            <span className="font-bold">{columnName}</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Itens</p>
            <div className="space-y-4">
              {products.map((order) => (
                <OrderItem order={order}/>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-sm text-gray-500">Total</p>
            <span className="font-bold">{formatCurrency(order.total_price)}</span>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        <></>
        {/* <div className="w-full flex  justify-between items-center">
          <Button variant="secondary" size="md" onClick={onClose}>Cancelar Pedido</Button>
          <Button onClick={() => {}} size="md">Concluir Pedido</Button>
        </div> */}
      </ModalFooter>
    </Modal>
  );
}

export default OrderDetailModal;
