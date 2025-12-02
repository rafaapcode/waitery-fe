import { useMutation } from "@tanstack/react-query";
import { PencilIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import type { User } from "../../../../app/entities/User";
import { UsersService } from "../../../../app/service/users/userServices";
import Button from "../../../../components/atoms/Button";
import ConfirmModal from "../../../../components/molecules/ConfirmModal";
import { useUsersController } from "../useUsersController";
import EditUserModal from "./EditUserModal";

interface UsersActionComponentProps {
  user?: User;
}

function UsersActionComponent({ user }: UsersActionComponentProps) {
  const {
    isOpenEditUserModal,
    onCloseEditUserModal,
    isOpenConfirmModal,
    onCloseconfirmModal,
    onOpenConfirmModal,
    onOpenEditUserModal
  } = useUsersController(user);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: () => UsersService.deleteUser(user?.id || ''),
    onSuccess: () => {
      onCloseconfirmModal()
      toast.success("Usuário excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir usuário");
    }
  })

  return (
     <div className="flex gap-1.5 items-center justify-end">
        {user  && (
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
          onConfirm={() => mutateAsync()}
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
        <Button
          onClick={onOpenConfirmModal}
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
