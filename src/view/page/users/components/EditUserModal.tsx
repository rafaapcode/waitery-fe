import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserPen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { User } from "../../../../app/entities/User";
import { UsersService } from "../../../../app/service/users/userServices";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import RadioGroup, {
  RadioGroupItem,
} from "../../../../components/molecules/RadioGroup";
import { editUserFormSchema, type EditUserFormData } from "../schemas/editUserSchema";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

function EditUserModal({ open, onClose, user }: EditUserModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role:
        user?.role === "ADMIN" || user?.role === "WAITER"
          ? user.role
          : "WAITER",
    },
  });

  const {mutateAsync, isPending} = useMutation({
    mutationFn: (data: UsersService.UpdateUserInput['data']) => UsersService.updateUser({id: user?.id || '', data }),
    onSuccess: () => {
      onClose();
      toast.success("Usuário atualizado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao atualizar usuário");
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutateAsync(data);
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Editar Usuário" icon={UserPen} onClose={() => {
        onClose();
        reset();
      }} />

      <ModalContent>
        <div className="w-[416px] space-y-6">
          <Input
            type="text"
            placeholder="Nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            error={errors.password?.message}
          />

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <RadioGroup
                className="gap-6"
                onValueChange={field.onChange}
                value={field.value}
              >
                <RadioGroupItem value="ADMIN">
                  <p>Admin</p>
                </RadioGroupItem>
                <RadioGroupItem value="WAITER">
                  <p>Waiter</p>
                </RadioGroupItem>
              </RadioGroup>
            )}
          />
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button size="md" variant="secondary">
          Excluir Usuário
        </Button>
        <Button
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
          size="md"
          onClick={onSubmit}
        >
          Salvar Alterações
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditUserModal;
