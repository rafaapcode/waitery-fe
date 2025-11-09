import { PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import type { User } from "../../../../app/entities/User";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";
import EditUserModal from "./EditUserModal";

interface UsersActionComponentProps {
  user?: User;
}

function UsersActionComponent({ user }: UsersActionComponentProps) {
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseEditUserModal = () => setIsOpenEditUserModal(false);
  const onCloseconfirmModal = () => setIsOpenConfirmModal(false);

  return (
    <div className="flex gap-1.5 items-center justify-end">
      {user && (
        <EditUserModal open={isOpenEditUserModal} onClose={onCloseEditUserModal} />
      )}
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir usuário"
        description={`Tem certeza que deseja excluir o usuário ${user?.name} ?  Esta ação não pode ser desfeita.`}
        onConfirm={() => {}}
        onCancel={onCloseconfirmModal}
      />
      <Button
        onClick={() => setIsOpenEditUserModal(true)}
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

export default UsersActionComponent;
