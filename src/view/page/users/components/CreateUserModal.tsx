import { UserPen } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  return (
    <Modal open={open}>
      <ModalHeader title="Criar Usuário" icon={UserPen} onClose={onClose} />

      <ModalContent>
        <h3 className="text-lg font-medium text-gray-700">
          Formulário de criação
        </h3>
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button>Cadastrar usuário</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;