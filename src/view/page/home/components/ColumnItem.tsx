
interface ColumnItemProps {
  order: {table: string; itens: string[]};
}

function ColumnItem({ order }: ColumnItemProps) {
  return (
    <button className="w-full flex flex-col justify-center items-center min-h-14 h-28 bg-gray-100 border border-gray-200 rounded-md">
      <p>{order.table}</p>
      <p className="text-gray-400 text-sm">{order.itens.length} Itens</p>
    </button>
  )
}

export default ColumnItem