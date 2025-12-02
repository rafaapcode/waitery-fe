import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserPen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserRole } from "../../../../app/entities/User";
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
import {
  createUserForm,
  type CreateUserFormData,
} from "../schemas/createUserSchema";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserForm),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: UserRole.WAITER,
      cpf: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UsersService.CreateUserInput) =>
      UsersService.createUser(data),
    onSuccess: () => {
      onClose();
      toast.success("Usuário criado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar usuário");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutateAsync(data);
  });

  return (
    <Modal open={open}>
      <ModalHeader
        title="Criar Usuário"
        icon={UserPen}
        onClose={() => {
          onClose();
          reset();
        }}
      />

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
            type="string"
            placeholder="Cpf"
            {...register("cpf")}
            error={errors.cpf?.message}
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
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
        >
          Cadastrar usuário
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;
