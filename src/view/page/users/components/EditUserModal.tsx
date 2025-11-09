import { UserPen } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import EditUserForm from "../forms/EditUserForm";
import type { EditUserFormData } from "../forms/schema";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
}

function EditUserModal({ open, onClose }: EditUserModalProps) {
  const {
    handleSubmit,
    formState: {isSubmitting },
  } = useFormContext<EditUserFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  })

  return (
    <Modal open={open}>
      <ModalHeader title="Editar Usuário" icon={UserPen} onClose={onClose} />

      <ModalContent>
        <EditUserForm />
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button size="md" variant="secondary">Excluir Usuário</Button>
        <Button disabled={isSubmitting} isLoading={isSubmitting} size="md" onClick={onSubmit}>Salvar Alterações</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditUserModal;