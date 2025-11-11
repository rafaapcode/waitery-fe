import { PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import type { Product } from "../../../../../app/entities/Product";
import Button from "../../../../../components/atoms/Button";
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
        description={`Tem certeza que deseja excluir o produto ? ${product.name}. `}
        onConfirm={() => {}}
        onCancel={onCloseConfirmModal}
      />
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
