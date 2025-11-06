import { formatCurrency } from "../../../app/lib/formatCurrency";
import DefaultImage from "../../../assets/images/default-image.png";

interface OrderItemProps {
  order: {
    name: string;
    quantity: number;
    price: number;
    image?: string;
  };
}

function OrderItem({ order }: OrderItemProps) {
  const { name, quantity, price, image } = order;
  return (
    <div className="flex gap-2 items-center">
      <img
        src={image || DefaultImage}
        alt="Image of Product"
        className="w-12 h-10 rounded-md object-cover"
      />
      <span className="text-xs text-gray-500 self-start">{quantity}x</span>
      <div className="flex flex-col">
        <span className="font-bold">{name}</span>
        <span className="text-xs text-gray-500">{formatCurrency(price)}</span>
      </div>
    </div>
  );
}

export default OrderItem;
