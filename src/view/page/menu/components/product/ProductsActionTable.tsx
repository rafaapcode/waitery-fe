import { PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../../../../app/entities/Product";
import { formatCurrency } from "../../../../../app/lib/formatCurrency";
import Button from "../../../../../components/atoms/Button";
import { Image } from "../../../../../components/atoms/Image";
import ConfirmModal from "../../../../../components/molecules/ConfirmModal";
import EditProductModal from "./EditProductModal";

interface ProductsActionComponentProps {
  product: Product;
}

function ProductsActionComponent({ product }: ProductsActionComponentProps) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseEditModal = () => setIsOpenEditModal(false);
  const onCloseConfirmModal = () => setIsOpenConfirmModal(false);

  return (
    <div className="flex gap-1.5 items-center justify-end">
      <EditProductModal 
        open={isOpenEditModal}
        onClose={onCloseEditModal}
        product={product}
      />
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir produto"
        onConfirm={() => {}}
        onCancel={onCloseConfirmModal}
      >
        <div className="w-full">
          <p>Tem certeza que deseja excluir o produto ?</p>
          <div className="mt-6 flex border border-gray-300 rounded-md">
            <Image src={product.image_url} alt={product.name} className="rounded-tr-none rounded-br-none"/>
            <div className="flex-1 py-2 px-4 flex flex-col justify-between">
              <p>{product.category.icon} {product.category.name}</p>
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-600">{formatCurrency(product.price)}</p>
            </div>
          </div>
        </div>
      </ConfirmModal>
      
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
