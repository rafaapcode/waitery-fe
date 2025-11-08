import { formatCurrency } from "../../../app/lib/formatCurrency";
import { Image } from "../../atoms/Image";

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
      <Image
        size="xs"
        src={image}
        alt="Image of Product"
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
