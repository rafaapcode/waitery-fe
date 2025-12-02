import { zodResolver } from "@hookform/resolvers/zod";
import { UserPen } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { UserRole } from "../../../../app/entities/User";
import { useCreateUserMutation } from "../../../../app/hooks/mutations/useUserMutation";
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

  const createUser = useCreateUserMutation(onClose);

  const onSubmit = handleSubmit((data) => {
    createUser.createUser(data);
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
          disabled={!isValid || !isDirty || isSubmitting || createUser.isPending}
          isLoading={isSubmitting || createUser.isPending}
        >
          Cadastrar usuário
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;
