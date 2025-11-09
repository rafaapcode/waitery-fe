import { UserPen } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
}

function EditUserModal({ open, onClose }: EditUserModalProps) {
  return (
    <Modal open={open}>
      <ModalHeader title="Editar Usuário" icon={UserPen} onClose={onClose} />

      <ModalContent>
        <h3 className="text-lg font-medium text-gray-700">
          Formulário de edição
        </h3>
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button size="md" variant="secondary">Excluir Usuário</Button>
        <Button disabled size="md">Salvar Alterações</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditUserModal;