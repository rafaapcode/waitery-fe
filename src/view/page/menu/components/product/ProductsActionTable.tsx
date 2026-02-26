import { CirclePercentIcon, PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../../../../app/entities/Product";
import { useDeleteProductMutation } from "../../../../../app/hooks/mutations/useProductMutation";
import { formatCurrency } from "../../../../../app/lib/formatCurrency";
import Button from "../../../../../components/atoms/Button";
import { Image } from "../../../../../components/atoms/Image";
import ConfirmModal from "../../../../../components/molecules/ConfirmModal";
import CreateDiscountModal from "./CreateDiscount";
import EditProductModal from "./EditProductModal";

interface ProductsActionComponentProps {
  product: Product;
}

function ProductsActionComponent({ product }: ProductsActionComponentProps) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenDiscountModal, setIsOpenDiscountModal] = useState(false);

  const onCloseEditModal = () => setIsOpenEditModal(false);
  const onCloseConfirmModal = () => setIsOpenConfirmModal(false);
  const onCloseDiscountModal = () => setIsOpenDiscountModal(false);

  const { deleteProduct, isPending } = useDeleteProductMutation({
    id: product.id,
    onClose: onCloseConfirmModal,
  });

  return (
    <div className="flex gap-1.5 items-center justify-end">
      <EditProductModal
        open={isOpenEditModal}
        onClose={onCloseEditModal}
        product={product}
      />
      <CreateDiscountModal
        open={isOpenDiscountModal}
        onClose={onCloseDiscountModal}
        product={product}
      />
      <ConfirmModal
        open={isOpenConfirmModal}
        title="Excluir produto"
        onConfirm={() => deleteProduct()}
        onCancel={onCloseConfirmModal}
        isLoading={isPending}
      >
        <div className="w-full">
          <p>Tem certeza que deseja excluir o produto ?</p>
          <div className="mt-6 flex border border-gray-300 rounded-md">
            <Image
              src={product.image_url}
              alt={product.name}
              className="rounded-tr-none rounded-br-none"
            />
            <div className="flex-1 py-2 px-4 flex flex-col justify-between">
              <p>
                {product.category.icon} {product.category.name}
              </p>
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-600">{formatCurrency(product.price)}</p>
            </div>
          </div>
        </div>
      </ConfirmModal>

      <Button
        onClick={() => setIsOpenDiscountModal(true)}
        size="icon"
        variant="secondary"
        className="text-green-800 hover:text-green-700"
      >
        <CirclePercentIcon size={18} />
      </Button>
      <Button
        onClick={() => setIsOpenEditModal(true)}
        size="icon"
        variant="secondary"
        className="text-gray-500 hover:text-gray-400"
      >
        <PencilIcon size={18} />
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

export default ProductsActionComponent;
