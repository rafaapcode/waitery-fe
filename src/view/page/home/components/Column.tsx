import { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import type { Order, OrderStatus } from "../../../../app/entities/Order";
import { useUpdateOrderMutation } from "../../../../app/hooks/mutations/useOrderMutation";
import OrderDetailModal from "../../../../components/molecules/OrderDetailModal";
import ColumnItem from "./ColumnItem";

interface ColumnProps {
  icon: string;
  name: string;
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

function Column({ icon, name, orders, setOrders }: ColumnProps) {
  const [order, setSelectOrder] = useState<Order | null>(null);
  const handleSelectOrder = (selectedOrder: Order) => {
    setSelectOrder(selectedOrder);
  };
  const { updateOrder } = useUpdateOrderMutation();

  const onUpdateOrder = (status: OrderStatus) => {
    try {
      if (!order) {
        toast.error("Pedido não encontrado");
        return;
      }
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order?.id ? { ...o, status } : o)),
      );
      updateOrder({ status, orderId: order?.id || "" }).catch((error) => {
        console.log("Error updating order:", error);
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === order?.id ? { ...o, status: order.status } : o,
          ),
        );
      });
      setSelectOrder(null);
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg flex-1 h-full">
      <OrderDetailModal
        columnName={`${icon} ${name}`}
        open={order !== null}
        onClose={() => setSelectOrder(null)}
        onUpdate={onUpdateOrder}
        order={order}
      />

      <div className="flex gap-4 items-center justify-center">
        <p>
          {icon} {name}
        </p>
        <div className="bg-gray-200 rounded w-fit px-1.5">{orders.length}</div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto max-h-full mt-4">
        {orders.map((order, index) => (
          <ColumnItem
            key={index}
            order={order}
            onSelectOrder={handleSelectOrder}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
