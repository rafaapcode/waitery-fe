import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UsersService } from "../../service/users/userServices";
import { useRevalidateUsers } from "../revalidates/useRevalidateUsers";

interface UseDeleteUserMutationProps {
  id: string;
  onClose: () => void;
}

export function useDeleteUserMutation({
  id,
  onClose,
}: UseDeleteUserMutationProps) {
  const { revalidateUsers } = useRevalidateUsers();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => UsersService.deleteUser(id),
    onSuccess: () => {
      revalidateUsers();
      onClose();
      toast.success("Usuário excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir usuário");
    },
  });

  return { deleteUser: mutateAsync, isPending };
}

interface UseEditUserMutationProps {
  id: string;
  onClose: () => void;
  dirtiedFields: UsersService.UpdateUserInput["dirtiedFields"];
}

export function useEditUserMutation({
  id,
  onClose,
  dirtiedFields,
}: UseEditUserMutationProps) {
  const { revalidateUsers } = useRevalidateUsers();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UsersService.UpdateUserInput["data"]) =>
      UsersService.updateUser({ id: id || "", data, dirtiedFields }),
    onSuccess: () => {
      revalidateUsers();
      onClose();
      toast.success("Usuário atualizado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao atualizar usuário");
    },
  });
  return { editUser: mutateAsync, isPending };
}

export function useCreateUserMutation(onClose: () => void) {
  const { revalidateUsers } = useRevalidateUsers();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UsersService.CreateUserInput) =>
      UsersService.createUser(data),
    onSuccess: () => {
      revalidateUsers();
      onClose();
      toast.success("Usuário criado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar usuário");
    },
  });
  return { createUser: mutateAsync, isPending };
}
