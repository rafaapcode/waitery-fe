import { UserPen } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import CreateUserForm from "../forms/CreateUserForm";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  return (
    <Modal open={open}>
      <ModalHeader title="Criar Usuário" icon={UserPen} onClose={onClose} />

      <ModalContent>
        <CreateUserForm />
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button className="w-full">Cadastrar usuário</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;