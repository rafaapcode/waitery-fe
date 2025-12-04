import { useState } from "react";
import type { Order } from "../../../../app/entities/Order";
import { useCancelOrderMutation, useDeleteOrderMutation, useUpdateOrderMutation } from "../../../../app/hooks/mutations/useOrderMutation";
import OrderDetailModal from "../../../../components/molecules/OrderDetailModal";
import ColumnItem from "./ColumnItem";

interface ColumnProps {
  icon: string;
  name: string;
  orders: Order[];
}

function Column({ icon, name, orders }: ColumnProps) {
  const [order, setSelectOrder] = useState<Order | null>(null);

  const handleSelectOrder = (selectedOrder: Order) => {
    setSelectOrder(selectedOrder);
  };

  const deleteOrderMutation = useDeleteOrderMutation({
    id: order?.id || "",
    onClose: () => setSelectOrder(null),
  });

  const updateOrderMutation = useUpdateOrderMutation({
    id: order?.id || "",
    onClose: () => setSelectOrder(null),
  });

  const cancelOrderMutation = useCancelOrderMutation({
    id: order?.id || "",
    onClose: () => setSelectOrder(null),
  });


  return (
    <div className="flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg flex-1 h-full">
      <OrderDetailModal
        columnName={`${icon} ${name}`}
        open={order !== null}
        onClose={() => setSelectOrder(null)}
        onDelete={deleteOrderMutation.deleteOrder}
        onUpdate={(status) => updateOrderMutation.updateOrder(status)}
        onCancel={cancelOrderMutation.cancelOrder}
        isDeleting={deleteOrderMutation.isPending}
        isUpdating={updateOrderMutation.isPending}
        isCanceling={cancelOrderMutation.isPending}
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
