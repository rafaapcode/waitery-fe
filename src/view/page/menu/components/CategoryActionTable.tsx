import { PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";

function CategoryActionComponent() {
  const [isOpenViewerModal, setIsOpenViewerModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseViewerModal = () => setIsOpenViewerModal(false);
  const onCloseconfirmModal = () => setIsOpenConfirmModal(false);

  return (
    <div className="flex gap-1.5 items-center justify-end">
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir pedido"
        description={`Tem certeza que deseja excluir o pedido  da mesa  ?  Esta ação não pode ser desfeita.`}
        onConfirm={() => {}}
        onCancel={onCloseconfirmModal}
      />
      <Button
        onClick={() => setIsOpenViewerModal(true)}
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

export default CategoryActionComponent;
