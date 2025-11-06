
interface ColumnItemProps {
  order: {table: string; status: string; itens: string[]};
  onSelectOrder: (order: {table: string; status: string; itens: string[]}) => void;
}

function ColumnItem({ order, onSelectOrder }: ColumnItemProps) {
  return (
    <button onClick={() => onSelectOrder(order)} className="w-full flex flex-col justify-center items-center min-h-14 h-28 bg-white border border-gray-200 rounded-md">
      <p>{order.table}</p>
      <p className="text-gray-400 text-sm">{order.itens.length} Itens</p>
    </button>
  )
}

export default ColumnItem