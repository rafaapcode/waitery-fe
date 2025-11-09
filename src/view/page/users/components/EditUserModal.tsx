import { UserPen } from "lucide-react";
import { Controller } from "react-hook-form";
import type { User } from "../../../../app/entities/User";
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
import { useUsersController } from "../useUsersController";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

function EditUserModal({ open, onClose, user }: EditUserModalProps) {
  const { formEditUser } = useUsersController(user);
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
  } = formEditUser;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Editar Usuário" icon={UserPen} onClose={onClose} />

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
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
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
