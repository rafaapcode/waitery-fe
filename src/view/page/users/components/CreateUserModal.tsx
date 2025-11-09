import { UserPen } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import CreateUserForm from "../forms/CreateUserForm";
import type { CreateUserFormData } from "../forms/schema";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<CreateUserFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Criar Usuário" icon={UserPen} onClose={onClose} />

      <ModalContent>
        <CreateUserForm />
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Cadastrar usuário
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;
