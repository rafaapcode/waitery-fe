import { useState } from "react";
import OrderDetailModal from "../../../../components/OrderDetailModal";
import ColumnItem from "./ColumnItem";

interface ColumnProps {
  icon: string;
  name: string;
  orders: {table: string; status: string; itens: string[]}[];
}

function Column({ icon, name, orders }: ColumnProps) {
  const [order, setSelectOrder] = useState<{table: string; status: string; itens: string[]} | null>(null);

  const handleSelectOrder = (selectedOrder: {table: string; status: string; itens: string[]}) => {
    setSelectOrder(selectedOrder);
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg flex-1 h-full">
      <OrderDetailModal open={order !== null} onClose={() => setSelectOrder(null)} order={order}/>
      <div className="flex gap-4 items-center justify-center">
        <p>{icon} {name}</p>
        <div className="bg-gray-200 rounded w-fit px-1.5">{orders.length}</div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto max-h-full mt-4">
        {
          orders.map((order, index) => (
            <ColumnItem key={index} order={order} onSelectOrder={handleSelectOrder}/>
          ))
        }
      </div>
    </div>
  );
}

export default Column;
