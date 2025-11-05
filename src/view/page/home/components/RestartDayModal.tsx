import { RotateCcwIcon } from "lucide-react";
import Modal, {
  ModalContent,
  ModalHeader,
} from "../../../../components/molecules/Modal";

interface RestartDayModalProps {
  open: boolean;
  onClose: () => void;
}

function RestartDayModal({ open, onClose }: RestartDayModalProps) {
  return (
    <Modal open={open}>
      <ModalHeader
        icon={RotateCcwIcon}
        title="Reiniciar Dia"
        onClose={onClose}
      />
      <ModalContent>
        <div>
          <h1>Teste123</h1>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default RestartDayModal;
