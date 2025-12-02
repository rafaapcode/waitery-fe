import { PencilIcon, Trash } from "lucide-react";
import type { User } from "../../../../app/entities/User";
import { useDeleteUserMutation } from "../../../../app/hooks/mutations/useUserMutation";
import { useAuth } from "../../../../app/hooks/useAuth";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";
import { useUsersController } from "../useUsersController";
import EditUserModal from "./EditUserModal";

interface UsersActionComponentProps {
  user?: User;
}

function UsersActionComponent({ user }: UsersActionComponentProps) {
  const { isOwner } = useAuth();
  const {
    isOpenEditUserModal,
    onCloseEditUserModal,
    isOpenConfirmModal,
    onCloseconfirmModal,
    onOpenConfirmModal,
    onOpenEditUserModal,
  } = useUsersController(user);

 const { deleteUser, isPending } = useDeleteUserMutation({ id: user?.id || "", onClose: onCloseconfirmModal })

  return (
    <div className="flex gap-1.5 items-center justify-end">
      {user && (
        <EditUserModal
          user={user}
          open={isOpenEditUserModal}
          onClose={onCloseEditUserModal}
        />
      )}
      <ConfirmModal
        open={isOpenConfirmModal}
        title="Excluir usuário"
        description={`Tem certeza que deseja excluir o usuário ${user?.name} ?  Esta ação não pode ser desfeita.`}
        onConfirm={() => deleteUser()}
        onCancel={onCloseconfirmModal}
        isLoading={isPending}
      />
      <Button
        onClick={onOpenEditUserModal}
        size="icon"
        variant="secondary"
        className="text-gray-500 hover:text-gray-400"
      >
        <PencilIcon size={18} />
      </Button>
      {!isOwner(user?.role) && (
        <Button
          onClick={onOpenConfirmModal}
          size="icon"
          variant="secondary"
          className="text-red-700 hover:text-red-600"
        >
          <Trash size={18} />
        </Button>
      )}
    </div>
  );
}

export default UsersActionComponent;
